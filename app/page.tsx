import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[70vh]">
      <h1 className="text-3xl md:text-4xl font-semibold text-gray-900">
        Welcome to MedCare
      </h1>

      <p className="mt-3 text-gray-500 text-sm md:text-base">
        Your health, our priority.
      </p>
    </div>
  );
}
