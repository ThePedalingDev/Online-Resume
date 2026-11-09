import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export function PrevailHelmet3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(32, width / height, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.minDistance = 3.5;
    controls.maxDistance = 8;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.6;

    const shellMat = new THREE.MeshPhysicalMaterial({
      color: 0x111113, roughness: 0.35, metalness: 0.1,
      clearcoat: 0.6, clearcoatRoughness: 0.25, reflectivity: 0.4,
    });
    const innerMat = new THREE.MeshStandardMaterial({ color: 0x1b1b1d, roughness: 0.9 });
    const padMat = new THREE.MeshStandardMaterial({ color: 0x0c0c0d, roughness: 1.0 });
    const mipsMat = new THREE.MeshStandardMaterial({
      color: 0xd4c89a, roughness: 0.5, metalness: 0.05,
      emissive: 0x2a2414, emissiveIntensity: 0.2,
    });
    const accentMat = new THREE.MeshStandardMaterial({ color: 0xc14a2b, roughness: 0.5 });
    const strapMat = new THREE.MeshStandardMaterial({ color: 0x0a0a0b, roughness: 0.95 });
    const buckleMat = new THREE.MeshStandardMaterial({ color: 0x1d1d1f, roughness: 0.6, metalness: 0.3 });
    const cageMat = new THREE.MeshStandardMaterial({ color: 0x2a2a2d, roughness: 0.6 });

    const helmet = new THREE.Group();

    const shellGeo = new THREE.SphereGeometry(1, 96, 64, 0, Math.PI * 2, 0, Math.PI / 2);
    const pos = shellGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
      let nz = z < 0 ? z * 1.55 : z * 1.15;
      let nx = x * 0.95;
      let ny = y * 0.92;
      const tailFactor = nz < -0.3
        ? THREE.MathUtils.mapLinear(Math.max(nz, -1.6), -1.6, -0.3, 0.55, 1.0)
        : 1.0;
      nx *= tailFactor;
      if (nz > 0.6 && ny < 0.4) ny -= 0.05 * (nz - 0.6);
      pos.setXYZ(i, nx, ny, nz);
    }
    shellGeo.computeVertexNormals();
    helmet.add(new THREE.Mesh(shellGeo, shellMat));

    const innerGeo = shellGeo.clone();
    innerGeo.scale(0.94, 0.94, 0.94);
    const inner = new THREE.Mesh(innerGeo, innerMat);
    inner.position.y = -0.02;
    helmet.add(inner);

    const rim = new THREE.Mesh(new THREE.TorusGeometry(1.0, 0.035, 16, 120), innerMat);
    rim.rotation.x = Math.PI / 2;
    rim.scale.set(0.95, 1.3, 1.05);
    rim.position.y = 0.01;
    helmet.add(rim);

    const addVent = (px: number, py: number, pz: number, sx: number, sy: number, sz: number, rotY = 0) => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz), padMat);
      m.position.set(px, py, pz);
      m.rotation.y = rotY;
      helmet.add(m);
    };
    addVent(0, 0.92, 0.25, 0.16, 0.12, 0.55);
    addVent(0, 0.95, -0.45, 0.16, 0.12, 0.55);

    const sideRows = [
      { z: 0.55, y: 0.55, len: 0.35 },
      { z: 0.15, y: 0.75, len: 0.40 },
      { z: -0.30, y: 0.78, len: 0.45 },
      { z: -0.75, y: 0.60, len: 0.35 },
    ];
    sideRows.forEach(r => {
      for (const side of [-1, 1]) {
        const m = new THREE.Mesh(new THREE.BoxGeometry(0.10, 0.10, r.len), padMat);
        m.position.set(side * 0.85, r.y, r.z);
        m.rotation.y = side * 0.25;
        helmet.add(m);
      }
    });
    addVent(-0.35, 0.45, 0.82, 0.14, 0.10, 0.22);
    addVent(0.35, 0.45, 0.82, 0.14, 0.10, 0.22);
    addVent(0, 0.55, 0.88, 0.20, 0.10, 0.22);

    for (let i = -2; i <= 2; i++) {
      const strut = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.06, 1.6), cageMat);
      strut.position.set(i * 0.18, 0.80, -0.1);
      helmet.add(strut);
    }

    const mipsFront = new THREE.Mesh(new THREE.TorusGeometry(0.6, 0.04, 12, 48, Math.PI), mipsMat);
    mipsFront.rotation.x = Math.PI / 2;
    mipsFront.rotation.z = Math.PI;
    mipsFront.position.set(0, 0.10, 0.55);
    helmet.add(mipsFront);

    const mipsRear = new THREE.Mesh(new THREE.TorusGeometry(0.45, 0.035, 12, 48, Math.PI), mipsMat);
    mipsRear.rotation.x = Math.PI / 2;
    mipsRear.position.set(0, 0.15, -1.0);
    helmet.add(mipsRear);

    const dialBody = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.08, 32), buckleMat);
    dialBody.rotation.x = Math.PI / 2;
    dialBody.position.set(0, 0.08, -1.28);
    helmet.add(dialBody);
    const dialCap = new THREE.Mesh(new THREE.CylinderGeometry(0.10, 0.10, 0.04, 32), accentMat);
    dialCap.rotation.x = Math.PI / 2;
    dialCap.position.set(0, 0.08, -1.33);
    helmet.add(dialCap);

    const strap = (x: number, z: number, angle: number) => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.9, 0.07), strapMat);
      m.position.set(x, -0.35, z);
      m.rotation.z = angle;
      helmet.add(m);
    };
    strap(-0.72, 0.45, 0.15);
    strap(0.72, 0.45, -0.15);
    strap(-0.78, -0.55, 0.10);
    strap(0.78, -0.55, -0.10);

    const buckleL = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.04), buckleMat);
    buckleL.position.set(-0.78, -0.55, 0.50);
    helmet.add(buckleL);
    const buckleR = buckleL.clone();
    buckleR.position.x = 0.78;
    helmet.add(buckleR);

    const logo = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.05, 0.01), accentMat);
    logo.position.set(0.86, 0.40, 0.05);
    logo.rotation.y = Math.PI / 2;
    helmet.add(logo);
    const logo2 = logo.clone();
    logo2.position.x = -0.86;
    logo2.rotation.y = -Math.PI / 2;
    helmet.add(logo2);

    helmet.position.y = -0.1;
    scene.add(helmet);

    const shadow = new THREE.Mesh(
      new THREE.CircleGeometry(1.6, 64),
      new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.18 })
    );
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = -0.82;
    scene.add(shadow);

    scene.add(new THREE.AmbientLight(0xffffff, 0.35));
    const key = new THREE.DirectionalLight(0xffffff, 1.0);
    key.position.set(3, 5, 4);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xe8d8c0, 0.5);
    fill.position.set(-4, 2, 2);
    scene.add(fill);
    const rimLight = new THREE.DirectionalLight(0xffffff, 0.7);
    rimLight.position.set(-2, 3, -5);
    scene.add(rimLight);
    scene.add(new THREE.HemisphereLight(0xf6f4ee, 0x2a2620, 0.4));

    camera.position.set(3.2, 1.6, 4.2);
    controls.target.set(0, 0.2, 0);

    let frameId = 0;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      controls.dispose();
      renderer.dispose();
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
          else obj.material.dispose();
        }
      });
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="helmet-3d" aria-label="Specialized S-Works Prevail 3, interactive 3D view" />;
}
