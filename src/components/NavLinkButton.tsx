import { NavLink } from "react-router-dom";

export default function NavLinkButton({
  to,
  src,
  children,
}: {
  to: string;
  src: string;
  children?: React.ReactNode;
}) {
  return (
    <NavLink
      end
      className={({ isActive }) =>
        `text-lg flex p-2 rounded-4xl gap-2 ${
          isActive
            ? "bg-[#EEF2FF] text-[#4F46E5]"
            : "hover:bg-[#eee] text-[#64748B] "
        }`
      }
      to={to}
    >
      <img src={src} alt="icon" className="ml-2" />
      <span className="font-medium">{children}</span>
    </NavLink>
  );
}
