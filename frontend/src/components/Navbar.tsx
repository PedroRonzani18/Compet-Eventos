import { pages } from "@/utils/constants/pages";
import Link from "next/link";
interface INavbarProps {
  children: React.ReactNode;
}
function Navbar({children}:INavbarProps) {
  return ( 
<>
    <nav>
      <ul>
      {pages.map((page)=>(
        <li key={page.name}>
          <Link href={page.url}>
            {page.name}q
          </Link>
        </li>
      ))}
      </ul>
    </nav>
    {children}
</>
  );
}

export default Navbar;