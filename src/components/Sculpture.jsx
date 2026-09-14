import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

// Lazy-loaded, with no rendering offscreen, in background tabs, or while paused.
export default function Sculpture({ animated }) {
  const host = useRef(null);
  const controller = useRef(null);
  const enabled = useRef(animated);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    enabled.current = animated;
    controller.current?.refresh();
  }, [animated]);
  useEffect(() => {
    const element = host.current;
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "low-power",
      });
    } catch {
      setFailed(true);
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7));
    renderer.setClearColor(0x0c0c0c, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    element.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 50);
    camera.position.set(0, 0, 9.4);
    const pmrem = new THREE.PMREMGenerator(renderer);
    const room = new RoomEnvironment();
    const environment = pmrem.fromScene(room, 0.04);
    scene.environment = environment.texture;
    room.dispose();
    pmrem.dispose();
    const sculpture = new THREE.Group();
    scene.add(sculpture);
    const chrome = new THREE.MeshPhysicalMaterial({
      color: 0xcad4de,
      metalness: 1,
      roughness: 0.18,
      clearcoat: 1,
      clearcoatRoughness: 0.12,
      envMapIntensity: 1.8,
    });
    const geometry = new THREE.TorusKnotGeometry(1.32, 0.43, 200, 36, 2, 3);
    const knot = new THREE.Mesh(geometry, chrome);
    knot.rotation.set(0.2, -0.6, -0.4);
    sculpture.add(knot);
    const satelliteMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xff591f,
      metalness: 0.4,
      roughness: 0.18,
      clearcoat: 1,
    });
    const sphereGeometry = new THREE.SphereGeometry(0.22, 32, 24);
    const satellite = new THREE.Mesh(sphereGeometry, satelliteMaterial);
    satellite.position.set(2.15, 0.85, 0.4);
    sculpture.add(satellite);
    const ringGeometry = new THREE.TorusGeometry(2.4, 0.009, 8, 160);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x9e6546,
      transparent: true,
      opacity: 0.38,
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.set(1.08, 0.3, -0.45);
    sculpture.add(ring);
    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const warmLight = new THREE.PointLight(0xff662e, 22, 15);
    warmLight.position.set(-3, -2, 2);
    scene.add(warmLight);
    const coolLight = new THREE.DirectionalLight(0xc7dfff, 3);
    coolLight.position.set(2, 4, 4);
    scene.add(coolLight);
    let frame = 0,
      elapsed = 0,
      lastTime = 0;
    let inView = true,
      disposed = false;
    const pointer = { x: 0, y: 0 };
    const canAnimate = () =>
      enabled.current && inView && !document.hidden && !disposed;
    const render = (time) => {
      frame = 0;
      if (disposed) return;
      const delta = lastTime ? Math.min((time - lastTime) / 1000, 0.05) : 0;
      lastTime = time;
      if (canAnimate()) {
        elapsed += delta;
        knot.rotation.y = -0.6 + elapsed * 0.13;
        knot.rotation.z = -0.4 + Math.sin(elapsed * 0.23) * 0.15;
        sculpture.rotation.x +=
          (pointer.y * 0.18 - sculpture.rotation.x) * 0.045;
        sculpture.rotation.y +=
          (pointer.x * 0.24 - sculpture.rotation.y) * 0.045;
        sculpture.position.y = Math.sin(elapsed * 0.75) * 0.1;
        satellite.position.y = 0.85 + Math.sin(elapsed * 0.8) * 0.3;
      }
      renderer.render(scene, camera);
      if (canAnimate()) frame = requestAnimationFrame(render);
    };
    const refresh = () => {
      cancelAnimationFrame(frame);
      lastTime = 0;
      frame = 0;
      if (!disposed && inView && !document.hidden) render(performance.now());
    };
    controller.current = { refresh };
    const resize = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      if (!width || !height) return;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.position.z = camera.aspect < 0.8 ? 11 : 9.4;
      camera.updateProjectionMatrix();
      refresh();
    });
    resize.observe(element);
    const visibility = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      refresh();
    });
    visibility.observe(element);
    const onPointerMove = (event) => {
      if (!enabled.current || event.pointerType === "touch") return;
      const bounds = element.getBoundingClientRect();
      pointer.x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
      pointer.y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
    };
    const onPointerLeave = () => {
      pointer.x = 0;
      pointer.y = 0;
    };
    const onContextLost = (event) => {
      event.preventDefault();
      disposed = true;
      cancelAnimationFrame(frame);
      setFailed(true);
    };
    element.addEventListener("pointermove", onPointerMove);
    element.addEventListener("pointerleave", onPointerLeave);
    renderer.domElement.addEventListener("webglcontextlost", onContextLost);
    document.addEventListener("visibilitychange", refresh);
    refresh();
    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      resize.disconnect();
      visibility.disconnect();
      document.removeEventListener("visibilitychange", refresh);
      element.removeEventListener("pointermove", onPointerMove);
      element.removeEventListener("pointerleave", onPointerLeave);
      renderer.domElement.removeEventListener(
        "webglcontextlost",
        onContextLost,
      );
      geometry.dispose();
      sphereGeometry.dispose();
      ringGeometry.dispose();
      chrome.dispose();
      satelliteMaterial.dispose();
      ringMaterial.dispose();
      environment.dispose();
      renderer.dispose();
      renderer.domElement.remove();
      controller.current = null;
    };
  }, []);
  return (
    <div className="sculpture-host" ref={host} aria-hidden="true">
      {failed && (
        <div className="sculpture-fallback">
          <span />
          <span />
          <span />
        </div>
      )}
    </div>
  );
}
