import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';

const Lanyard = ({ photoUrl = '/avatar.png', className = '' }) => {
    const canvasRef = useRef(null);
    const engineRef = useRef(null);
    const [imageLoaded, setImageLoaded] = useState(false);
    const imageRef = useRef(null);

    useEffect(() => {
        // Load image first
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
            imageRef.current = img;
            setImageLoaded(true);
        };
        img.onerror = () => {
            setImageLoaded(true); // Still proceed without image
        };
        img.src = photoUrl;
    }, [photoUrl]);

    useEffect(() => {
        if (!canvasRef.current || !imageLoaded) return;

        const { Engine, Render, Runner, Bodies, Composite, Constraint, Mouse, MouseConstraint, Events } = Matter;

        const container = canvasRef.current.parentElement;
        const width = container.clientWidth;
        const height = container.clientHeight;

        // Create engine
        const engine = Engine.create({
            gravity: { x: 0, y: 1.2 }
        });
        engineRef.current = engine;

        // Create renderer
        const render = Render.create({
            element: container,
            canvas: canvasRef.current,
            engine: engine,
            options: {
                width: width,
                height: height,
                wireframes: false,
                background: 'transparent',
                pixelRatio: window.devicePixelRatio || 1
            }
        });

        // Lanyard settings
        const ropeStartX = width / 2;
        const ropeStartY = 0;
        const segmentLength = 15;
        const segments = 10;
        const ropeWidth = 12;

        // Create rope segments
        const ropeSegments = [];
        for (let i = 0; i < segments; i++) {
            const segment = Bodies.rectangle(
                ropeStartX,
                ropeStartY + i * segmentLength + segmentLength / 2,
                ropeWidth,
                segmentLength,
                {
                    collisionFilter: { group: -1 },
                    render: { visible: false },
                    friction: 0.5,
                    frictionAir: 0.015,
                    restitution: 0.1
                }
            );
            ropeSegments.push(segment);
        }

        // Card dimensions
        const cardWidth = 130;
        const cardHeight = 175;
        const cardY = ropeStartY + segments * segmentLength + cardHeight / 2 + 12;

        // Create card body
        const card = Bodies.rectangle(ropeStartX, cardY, cardWidth, cardHeight, {
            collisionFilter: { group: -1 },
            render: {
                sprite: imageRef.current ? {
                    texture: photoUrl,
                    xScale: cardWidth / (imageRef.current.width || cardWidth),
                    yScale: cardHeight / (imageRef.current.height || cardHeight)
                } : { visible: false }
            },
            chamfer: { radius: 10 },
            friction: 0.3,
            frictionAir: 0.02,
            restitution: 0.15,
            label: 'card'
        });

        Composite.add(engine.world, [...ropeSegments, card]);

        // Create constraints for rope
        const constraints = [];

        // Anchor first segment to fixed point
        constraints.push(Constraint.create({
            pointA: { x: ropeStartX, y: ropeStartY },
            bodyB: ropeSegments[0],
            pointB: { x: 0, y: -segmentLength / 2 },
            stiffness: 0.95,
            damping: 0.05,
            render: { visible: false }
        }));

        // Connect segments
        for (let i = 0; i < segments - 1; i++) {
            constraints.push(Constraint.create({
                bodyA: ropeSegments[i],
                pointA: { x: 0, y: segmentLength / 2 },
                bodyB: ropeSegments[i + 1],
                pointB: { x: 0, y: -segmentLength / 2 },
                stiffness: 0.95,
                damping: 0.05,
                render: { visible: false }
            }));
        }

        // Connect last segment to card
        constraints.push(Constraint.create({
            bodyA: ropeSegments[segments - 1],
            pointA: { x: 0, y: segmentLength / 2 },
            bodyB: card,
            pointB: { x: 0, y: -cardHeight / 2 },
            stiffness: 0.95,
            damping: 0.05,
            render: { visible: false }
        }));

        Composite.add(engine.world, constraints);

        // Mouse interaction
        const mouse = Mouse.create(render.canvas);
        const mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                damping: 0.2,
                render: { visible: false }
            }
        });

        Composite.add(engine.world, mouseConstraint);
        render.mouse = mouse;

        // Custom render
        Events.on(render, 'afterRender', () => {
            const ctx = render.context;

            // Get all rope points
            const points = [{ x: ropeStartX, y: ropeStartY }];
            ropeSegments.forEach(seg => {
                points.push({ x: seg.position.x, y: seg.position.y });
            });
            points.push({ x: card.position.x, y: card.position.y - cardHeight / 2 });

            // Draw lanyard strap shadow
            ctx.save();
            ctx.filter = 'blur(4px)';
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(0, 0, 0, 0.4)';
            ctx.lineWidth = ropeWidth + 6;
            ctx.lineCap = 'butt';
            if (points.length >= 2) {
                ctx.moveTo(points[0].x + 3, points[0].y + 3);
                for (let i = 0; i < points.length - 1; i++) {
                    const xc = (points[i].x + points[i + 1].x) / 2 + 3;
                    const yc = (points[i].y + points[i + 1].y) / 2 + 3;
                    ctx.quadraticCurveTo(points[i].x + 3, points[i].y + 3, xc, yc);
                }
                ctx.lineTo(points[points.length - 1].x + 3, points[points.length - 1].y + 3);
            }
            ctx.stroke();
            ctx.filter = 'none';
            ctx.restore();

            // Draw main lanyard strap
            ctx.beginPath();
            ctx.strokeStyle = '#1a1a1a';
            ctx.lineWidth = ropeWidth;
            ctx.lineCap = 'butt';
            ctx.lineJoin = 'round';
            if (points.length >= 2) {
                ctx.moveTo(points[0].x, points[0].y);
                for (let i = 0; i < points.length - 1; i++) {
                    const xc = (points[i].x + points[i + 1].x) / 2;
                    const yc = (points[i].y + points[i + 1].y) / 2;
                    ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
                }
                ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
            }
            ctx.stroke();

            // Fabric texture pattern
            ctx.strokeStyle = '#0e0e0e';
            ctx.lineWidth = ropeWidth;
            ctx.setLineDash([3, 4]);
            ctx.stroke();
            ctx.setLineDash([]);

            // Edge highlights
            ctx.beginPath();
            ctx.strokeStyle = '#2a2a2a';
            ctx.lineWidth = 1;
            if (points.length >= 2) {
                ctx.moveTo(points[0].x - ropeWidth / 2 + 1, points[0].y);
                for (let i = 0; i < points.length - 1; i++) {
                    const xc = (points[i].x + points[i + 1].x) / 2 - ropeWidth / 2 + 1;
                    const yc = (points[i].y + points[i + 1].y) / 2;
                    ctx.quadraticCurveTo(points[i].x - ropeWidth / 2 + 1, points[i].y, xc, yc);
                }
            }
            ctx.stroke();

            // Draw anchor clip at top
            ctx.beginPath();
            ctx.arc(ropeStartX, ropeStartY + 8, 9, 0, Math.PI * 2);
            ctx.fillStyle = '#111';
            ctx.fill();
            ctx.strokeStyle = '#333';
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(ropeStartX, ropeStartY + 8, 4, 0, Math.PI * 2);
            ctx.fillStyle = '#000';
            ctx.fill();

            // Draw card glow
            ctx.save();
            ctx.translate(card.position.x, card.position.y);
            ctx.rotate(card.angle);
            ctx.shadowColor = 'rgba(99, 102, 241, 0.4)';
            ctx.shadowBlur = 25;
            ctx.strokeStyle = 'rgba(99, 102, 241, 0.6)';
            ctx.lineWidth = 2;
            ctx.roundRect(-cardWidth / 2, -cardHeight / 2, cardWidth, cardHeight, 10);
            ctx.stroke();
            ctx.restore();
        });

        // Start engine
        const runner = Runner.create();
        Runner.run(runner, engine);
        Render.run(render);

        // Cleanup
        return () => {
            Render.stop(render);
            Runner.stop(runner);
            Composite.clear(engine.world);
            Engine.clear(engine);
            render.textures = {};
        };
    }, [imageLoaded, photoUrl]);

    return (
        <div className={`relative w-full h-full ${className}`}>
            <canvas
                ref={canvasRef}
                className="w-full h-full"
                style={{
                    background: 'transparent',
                    cursor: 'grab'
                }}
            />
            {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
                </div>
            )}
        </div>
    );
};

export default Lanyard;
