import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function SessionPage() {
  const session = await getSession();

  if (!session || !session.refreshToken) {
    redirect("/signin");
  }

  return (
    <main className="min-h-screen bg-void p-6">
      <div>
        {/* Header Section */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-hologram font-montserrat">
              Session Dashboard
            </h1>
            <p className="text-static mt-1">
              Your current authentication details
            </p>
          </div>
          <div className="bg-matrix rounded-lg px-4 py-3 border border-wireframe">
            <div className="text-neon font-bold text-lg">
              {session.user.name}
            </div>
            <div className="text-xs text-static mt-1">
              User ID: <span className="text-pulse">{session.user.id}</span>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-matrix rounded-xl overflow-hidden border border-wireframe shadow-lg">
          {/* Card Header */}
          <div className="bg-slate px-6 py-4 border-b border-wireframe">
            <h2 className="text-xl font-semibold text-hologram flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-neon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              Authentication Tokens
            </h2>
          </div>

          {/* Token Display */}
          <div className="p-6">
            <div className="mb-6">
              <div className="flex items-center mb-3">
                <span className="bg-neon/20 text-neon text-xs px-2 py-1 rounded mr-2">
                  Access
                </span>
                <span className="text-xs text-static">
                  Expires every 60 seconds
                </span>
              </div>
              <div className="bg-slate rounded-lg p-4 text-sm font-mono break-all text-hologram/80 border border-wireframe">
                {session.accessToken}
              </div>
            </div>

            <div>
              <div className="flex items-center mb-3">
                <span className="bg-valid/20 text-valid text-xs px-2 py-1 rounded mr-2">
                  Refresh
                </span>
                <span className="text-xs text-static">Expires in 1 hour</span>
              </div>
              <div className="bg-slate rounded-lg p-4 text-sm font-mono break-all text-hologram/80 border border-wireframe">
                {session.refreshToken}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-slate px-6 py-3 border-t border-wireframe text-xs text-static flex justify-between items-center">
            <div className="flex items-center">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Keep your tokens secure
            </div>
            <div className="text-hologram/60">
              Last refreshed: {new Date().toLocaleString()}
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-matrix rounded-lg p-4 border border-wireframe">
            <h3 className="text-sm font-semibold text-hologram/80 mb-2">
              Session Status
            </h3>
            <div className="flex items-center">
              <span className="w-2 h-2 rounded-full bg-valid mr-2"></span>
              <span className="text-xs text-hologram/70">Active</span>
            </div>
          </div>

          <div className="bg-matrix rounded-lg p-4 border border-wireframe">
            <h3 className="text-sm font-semibold text-hologram/80 mb-2">
              Device
            </h3>
            <p className="text-xs text-hologram/70">Unknown device</p>
          </div>

          <div className="bg-matrix rounded-lg p-4 border border-wireframe">
            <h3 className="text-sm font-semibold text-hologram/80 mb-2">
              IP Address
            </h3>
            <p className="text-xs text-hologram/70">192.168.1.1</p>
          </div>
        </div>
      </div>
    </main>
  );
}
