"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

function createCodeTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 256;

  const context = canvas.getContext("2d");
  if (!context) {
    return null;
  }

  const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, "#12c9ed");
  gradient.addColorStop(1, "#0575d9");
  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = "rgba(255,255,255,0.92)";
  context.font = "bold 72px Arial";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText("</>", canvas.width / 2, canvas.height / 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function EjischoolHeroScene() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) {
      return;
    }

    try {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0.55, 8.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.inset = "0";
    renderer.domElement.style.zIndex = "1";
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const cyan = new THREE.MeshPhysicalMaterial({
      color: "#11c7e8",
      metalness: 0.22,
      roughness: 0.28,
      clearcoat: 0.85,
      clearcoatRoughness: 0.22
    });
    const blue = new THREE.MeshPhysicalMaterial({
      color: "#0752c7",
      metalness: 0.14,
      roughness: 0.34,
      clearcoat: 0.7
    });
    const white = new THREE.MeshPhysicalMaterial({
      color: "#ffffff",
      metalness: 0.05,
      roughness: 0.2,
      transmission: 0.08
    });

    const eBarGeometry = new THREE.BoxGeometry(2.35, 0.38, 0.5);
    const eStemGeometry = new THREE.BoxGeometry(0.42, 2.3, 0.5);
    const eParts = [
      [-1.75, 0.82, 0],
      [-1.75, 0, 0],
      [-1.75, -0.82, 0]
    ].map(([x, y, z]) => {
      const mesh = new THREE.Mesh(eBarGeometry, cyan);
      mesh.position.set(x, y, z);
      mesh.castShadow = true;
      return mesh;
    });
    const eStem = new THREE.Mesh(eStemGeometry, cyan);
    eStem.position.set(-2.7, 0, 0);
    eParts.push(eStem);
    eParts.forEach((mesh) => group.add(mesh));

    const jStem = new THREE.Mesh(new THREE.BoxGeometry(0.5, 2.1, 0.54), cyan);
    jStem.position.set(1.75, 0.45, 0);
    group.add(jStem);

    const jHook = new THREE.Mesh(new THREE.TorusGeometry(0.84, 0.24, 24, 88, Math.PI * 1.42), cyan);
    jHook.position.set(1.18, -0.75, 0);
    jHook.rotation.z = Math.PI * 0.08;
    group.add(jHook);

    const codeTexture = createCodeTexture();
    const codeOrb = new THREE.Mesh(
      new THREE.SphereGeometry(0.72, 48, 48),
      codeTexture ? new THREE.MeshPhysicalMaterial({ map: codeTexture, roughness: 0.22, metalness: 0.06, clearcoat: 0.65 }) : white
    );
    codeOrb.position.set(0.34, -0.05, 0.28);
    group.add(codeOrb);

    const ringMaterial = new THREE.MeshBasicMaterial({ color: "#8eeaff", transparent: true, opacity: 0.16 });
    const rings = [2.45, 3.2, 3.95].map((radius) => {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(radius, 0.012, 8, 128), ringMaterial);
      ring.rotation.x = Math.PI / 2.05;
      ring.position.z = -0.7;
      scene.add(ring);
      return ring;
    });

    const cubeGeometry = new THREE.BoxGeometry(0.38, 0.38, 0.38);
    const cubes = [
      { position: [2.85, 1.8, -0.2], material: cyan },
      { position: [-3.25, -1.8, -0.1], material: blue },
      { position: [3.35, -1.35, 0.15], material: white }
    ].map(({ position, material }) => {
      const cube = new THREE.Mesh(cubeGeometry, material);
      cube.position.set(position[0], position[1], position[2]);
      scene.add(cube);
      return cube;
    });

    scene.add(new THREE.AmbientLight(0xffffff, 1.6));
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(3, 4, 5);
    scene.add(keyLight);
    const rimLight = new THREE.PointLight(0x11d7f5, 32, 10);
    rimLight.position.set(-3.4, -1.6, 3.4);
    scene.add(rimLight);

    const resize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    let frameId = 0;
    const clock = new THREE.Clock();
    const animate = () => {
      const elapsed = clock.getElapsedTime();
      group.rotation.y = Math.sin(elapsed * 0.45) * 0.18 - 0.18;
      group.rotation.x = Math.sin(elapsed * 0.35) * 0.05;
      codeOrb.rotation.y = elapsed * 0.9;
      rings.forEach((ring, index) => {
        ring.rotation.z = elapsed * (0.06 + index * 0.025);
      });
      cubes.forEach((cube, index) => {
        cube.rotation.x = elapsed * (0.5 + index * 0.14);
        cube.rotation.y = elapsed * (0.42 + index * 0.16);
        cube.position.y += Math.sin(elapsed + index) * 0.0008;
      });
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      renderer.dispose();
      eBarGeometry.dispose();
      eStemGeometry.dispose();
      cubeGeometry.dispose();
      codeTexture?.dispose();
      mount.removeChild(renderer.domElement);
    };
    } catch (error) {
      console.error("Unable to start Ejischool 3D scene", error);
      return undefined;
    }
  }, []);

  return (
    <div ref={mountRef} className="relative h-full min-h-[360px] w-full md:min-h-[560px]" aria-label="Animated 3D Ejischool code mark">
      <div className="pointer-events-none absolute inset-0 grid place-items-center [perspective:900px]">
        <div className="relative h-72 w-72 animate-[spin_18s_linear_infinite] rounded-full border border-[#c9f4fb] bg-[radial-gradient(circle_at_35%_30%,rgba(255,255,255,0.96),rgba(18,191,228,0.16)_56%,rgba(7,82,199,0.12))] shadow-[0_35px_80px_rgba(18,191,228,0.25)] [transform-style:preserve-3d] md:h-96 md:w-96">
          <div className="absolute left-1/2 top-1/2 h-28 w-52 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-[#12bfe4] shadow-[0_18px_40px_rgba(7,82,199,0.22)] [transform:rotateY(-24deg)_rotateX(14deg)_translateZ(70px)]" />
          <div className="absolute left-1/2 top-1/2 grid h-24 w-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-3xl font-black text-[#12bfe4] shadow-[0_18px_36px_rgba(7,26,51,0.12)] [transform:rotateY(22deg)_translateZ(105px)]">
            &lt;/&gt;
          </div>
        </div>
      </div>
    </div>
  );
}
