import SidebarContent from "./SidebarContent";

export default function Sidebar() {
  return (
    <aside className="hidden md:flex fixed left-0 top-0 w-64 h-screen bg-[#0f1630] border-r border-white/10 z-40">
      <SidebarContent />
    </aside>
  );
}