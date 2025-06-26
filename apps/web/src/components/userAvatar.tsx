import { User } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

const UserAvatar = ({ url }: { url: string }) => {
  return (
    <div className="relative">
      <div className="w-8 h-8 rounded-full bg-neon/20 flex items-center justify-center text-neon">
        <Avatar className="h-full w-full">
          <AvatarImage src={url} className="rounded-full object-cover" />
          <AvatarFallback className="bg-transparent">
            <User className="w-4 h-4 text-current" />
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-slate bg-valid"></div>
    </div>
  );
};

export default UserAvatar;
