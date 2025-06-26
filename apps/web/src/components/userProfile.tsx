import { Session } from "@/lib/session";
import UserAvatar from "./userAvatar";

const UserProfile = ({ session }: { session: Session }) => {
  return (
    <div className="absolute w-64 bottom-0">
      {/* User Profile - Bottom */}
      <div className="p-2 bg-matrix m-1 rounded-md">
        <div className="flex items-center gap-2 p-1.5 rounded hover:bg-wireframe/30">
          <UserAvatar url="test" />
          <div className="flex-1 min-w-0">
            <div className="font-medium text-sm truncate text-hologram">
              {session?.user?.name || "Guest"}
            </div>
            <div className="text-xs truncate text-static">
              #{session?.user?.id}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserProfile;
