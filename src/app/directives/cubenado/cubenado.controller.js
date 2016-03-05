'use strict';

import BABYLON from './babylon.js';

export default class CubeNadoController {
    constructor($scope, $element) {

        // get canvas element
        this.canvas = $element[0].querySelector('canvas');

        // set count and speed defaults
        this.count = 1000;
        this.speed = 3;

        // create engine
        let engine = new BABYLON.Engine(this.canvas, true);

        // create scene and particleSystem
        // particleSystem extracted at this level to update the content dynamically
        let { scene, particleSystem } = this.createScene(this.canvas, engine);

        // render scene
        engine.runRenderLoop(function() {
            scene.render();
        });

        // watch for count slider changes and update emitRate
        // range from 10 to 10000 and incremented by 10
        $scope.$watch('cubenado.count', ()=> {
            particleSystem.emitRate = $scope.cubenado.count;
        });

        // watch for speed slider changes and update speed
        // range from 1 to 20 and incremented by 1
        // result will be divided by 1000 to get expected speed
        // so speed 3 will become 0.03
        $scope.$watch('cubenado.speed', ()=> {
            particleSystem.updateSpeed = $scope.cubenado.speed / 1000;
        });
    }

    createScene(canvas, engine) {

        let scene, light1, light2, camera, tornado, plane, particleSystem, animation;

        // create scene
        scene = new BABYLON.Scene(engine);

        // add lights to the scene
        light1 = new BABYLON.PointLight("Omni", new BABYLON.Vector3(0, 2, 8), scene);
        light2 = new BABYLON.PointLight("Omni", new BABYLON.Vector3(10, 20, 60), scene);

        // create and attach camera to the canvas
        camera = new BABYLON.ArcRotateCamera("ArcRotateCamera", 1, 0.8, 50, new BABYLON.Vector3(0, 0, 0), scene);
        camera.attachControl(canvas, true);

        // tornado object
        tornado = BABYLON.MeshBuilder.CreateSphere("tornado", {diameter: 0.1, diameterX: 0.1}, scene);

        // create plane apply material
        plane = BABYLON.Mesh.CreatePlane("plane", 50, scene);
        plane.position = new BABYLON.Vector3.Zero();
        plane.rotation = new BABYLON.Vector3(Math.PI / 2, 0, 0);
        plane.material = new BABYLON.StandardMaterial("material", scene);
        plane.material.backFaceCulling = false;
        plane.material.diffuseColor = new BABYLON.Color3(0.3, 0.3, 1);

        // get particle system
        particleSystem = this.createParticleSystem(scene);

        // assign tornado object as the emitter
        particleSystem.emitter = tornado;

        // get animation
        animation = this.createAnimation();

        // set animation to tornado
        tornado.animations.push(animation);

        // start animation
        scene.beginAnimation(tornado, 0, 100, true);

        // return scene and particleSystem
        return { scene, particleSystem };
    }

    createParticleSystem(scene) {

        // Create a particle system
        const particleSystem = new BABYLON.ParticleSystem('particles', 2000, scene);

        //Texture of each particle
        particleSystem.particleTexture = new BABYLON.Texture('texture.png', scene);
        particleSystem.textureMask = new BABYLON.Color4(0, 0, 0, 1.0);

        // Starting all from
        particleSystem.minEmitBox = new BABYLON.Vector3.Zero();
        particleSystem.maxEmitBox = new BABYLON.Vector3(1, 0, 0);

        // Colors of all particles
        particleSystem.color1 = new BABYLON.Color4(0.7, 0.8, 1.0, 1.0);
        particleSystem.color2 = new BABYLON.Color4(0.2, 0.5, 1.0, 1.0);
        particleSystem.colorDead = new BABYLON.Color4(0, 0, 0.2, 0.0);

        // Size of each particle
        particleSystem.minSize = 0.5;
        particleSystem.maxSize = 0.9;

        // Life time of each particle
        particleSystem.minLifeTime = 0.3;
        particleSystem.maxLifeTime = 1.5;

        // Emission rate, will be updated dynamically
        particleSystem.emitRate = 100;

        // Blend Mode
        particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_STANDARD;

        // Set the gravity of all particles
        particleSystem.gravity = new BABYLON.Vector3(0, -1, 0);

        // Direction of each particle after it has been emitted
        particleSystem.direction1 = new BABYLON.Vector3(-6, 30, 6);
        particleSystem.direction2 = new BABYLON.Vector3(6, 30, -6);

        // Angular speed, in radians
        particleSystem.minAngularSpeed = 0;
        particleSystem.maxAngularSpeed = Math.PI;

        // Speed
        particleSystem.minEmitPower = 1;
        particleSystem.maxEmitPower = 3;

        // will be updated dynamically
        particleSystem.updateSpeed = 0.005;

        // Start the particle system
        particleSystem.start();

        return particleSystem;
    }

    createAnimation() {

        // tornado animation
        let animation = new BABYLON.Animation('animation', 'position.x', 60,
            BABYLON.Animation.ANIMATIONTYPE_FLOAT,
            BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);

        // keyframes
        let keys = [
            { frame: 0,   value: 1 },
            { frame: 20,  value: 3 },
            { frame: 40,  value: 6 },
            { frame: 50,  value: 9 },
            { frame: 60,  value: 6 },
            { frame: 80,  value: 3 },
            { frame: 100, value: 1 }
        ];

        // launch animation
        animation.setKeys(keys);

        return animation;
    }
}

CubeNadoController.$inject = ['$scope', '$element'];