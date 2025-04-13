const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="relative min-h-screen w-full bg-slate-950">
            {/* Left Glowing Circle */}
            <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full 
            bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]">
            </div>

            {/* Right Glowing Circle */}
            <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full 
            bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]">
            </div>

            {/* Page Content */}
            <main className="relative z-10">{children}</main>
        </div>
    );
};

export default Layout;
