"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Center,
  Environment,
  Float,
  Html,
  PerspectiveCamera,
  Sparkles,
  Stats,
  Text3D,
  useFBX,
} from "@react-three/drei";
import { Button, TextField } from "@mui/material";
import { Mesh, Object3D } from "three";
import { useForm } from "react-hook-form";

const KeyModel = () => {
  const group = useRef();

  useFrame((state, delta) => {
    group.current.rotation.x += delta;
    group.current.rotation.y += delta;
    group.current.rotation.z += delta;
    group.current.position.y = 3 + Math.sin(state.clock.getElapsedTime()) * -1;
    group.current.position.x = -6 + Math.cos(state.clock.getElapsedTime()) * 1;
  });

  const fbx = useFBX("/3dicons/key.fbx");

  const [meshes, setMeshes] = useState([]);

  const getAllMeshes = useCallback(() => {
    const temp: Array<Mesh> = [];
    fbx.traverse((child: Object3D | Mesh) => {
      if (child.isMesh) {
        temp.push(child);
      }
    });
    setMeshes(temp);
  }, []);

  useEffect(() => {
    getAllMeshes();
  }, []);

  return (
    <group ref={group} position={[0, 0, -1]}>
      {meshes.map((mesh: Mesh) => {
        return (
          <mesh key={mesh.uuid} geometry={mesh.geometry}>
            <meshNormalMaterial />
          </mesh>
        );
      })}
    </group>
  );
};

type Inputs = {
  username: string;
  password: string;
};

const Form = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = (data: Inputs) => console.log(data);

  return (
    <Float>
      <Html position={[-4, 4, 0]}>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <TextField
            className="w-64"
            label="User Name"
            variant="standard"
            type="text"
            {...register("username", { required: true })}
          />
          <TextField
            className="w-64"
            label="Password"
            variant="standard"
            type="password"
            {...register("password", { required: true })}
          />
          <Button variant="text" type="submit">
            Sign In
          </Button>
        </form>
      </Html>
    </Float>
  );
};

const Title = () => {
  return (
    <Center position={[0, 6, 0]}>
      <Float floatIntensity={5} speed={2}>
        <Text3D
          font={"/font/helvetiker_regular.typeface.json"}
          bevelEnabled
          bevelSize={0.05}
        >
          urban rotary phone
          <meshNormalMaterial />
        </Text3D>
      </Float>
    </Center>
  );
};

const Home = () => {
  return (
    <div className="w-screen h-screen">
      <Canvas
        gl={{
          antialias: true,
        }}
      >
        <Title />
        <KeyModel />
        <Form />
        <Sparkles position={[0, 1, 15]} size={2} color="orange" count={100} />
        <PerspectiveCamera makeDefault position={[0, 1, 15]} />
        <Environment
          background
          blur={0.5}
          files="/hdr/dikhololo_night_1k.hdr"
        />
        <Stats />
      </Canvas>
    </div>
  );
};

export default Home;
