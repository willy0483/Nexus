import { Cpu } from "lucide-react";

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <Cpu className="w-6 h-6 text-blue-400" />
      <span className="text-xl font-semibold">Nexus</span>
    </div>
  );
};
export default Logo;
