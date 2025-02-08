import { useState, useEffect } from "react";
import { cn } from "../../utils";
import { ProductItem, HoveredLink, Menu, MenuItem } from "../../components/navbar-menu";
import { Link, useNavigate } from "react-router-dom";
import dhanchaImage from "../../assets/dhancha.png";
import aankhImage from "../../assets/aankh.jpeg";
import jagrookImage from "../../assets/jagrook.jpg";
import samakshImage from "../../assets/samaksh.webp";
import dvitImage from "../../assets/dwit.jpg";

export function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2" />
    </div>
  );
}

function Navbar({ className }) {
  const [active, setActive] = useState(null);
  const [username, setUsername] = useState(localStorage.getItem("username") || "");
  const [role, setRole] = useState(localStorage.getItem("role") || "");
  const navigate = useNavigate();

  useEffect(() => {
    console.log("🔍 Stored Username:", localStorage.getItem("username")); 
    console.log("🔍 Stored Role:", localStorage.getItem("role")); 

    const handleStorageChange = () => {
      setUsername(localStorage.getItem("username") || "");
      setRole(localStorage.getItem("role") || "");
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
}, []);


  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");

    setUsername("");
    setRole("");
    navigate("/");
  };

  return (
    <div className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}>
      <Menu setActive={setActive} className="flex w-full">
        
        <div className="flex space-x-6">
          <MenuItem setActive={setActive} active={active} item="About us" />
          
          {username && role === "patient" && (
            <MenuItem setActive={setActive} active={active} item="Products">
              <div className="text-sm grid grid-cols-2 gap-10 p-4">
                <ProductItem title="Dhancha" src={dhanchaImage} description="Surgical Database with pricing." href="/dhancha" />
                <ProductItem title="Aankh" src={aankhImage} description="Image processing to read contents." href="/aankh" />
                <ProductItem title="Jagrook" src={jagrookImage} description="Educational surgical database." href="/jagrook" />
                <ProductItem title="Samaksh" src={samakshImage} description="Live camera feed" href="/samaksh" />
                <ProductItem title="Dvit" src={dvitImage} description="Second opinion doctor" href="/dvit" />
              </div>
            </MenuItem>
          )}
          
          <MenuItem setActive={setActive} active={active} item="Pricing" />
        </div>
  
        <div className="flex space-x-6 ml-auto">
          {username ? (
            <>
              <MenuItem setActive={setActive} active={active} item={`Hi, ${username}`} />
              <MenuItem setActive={setActive} active={active} item="Logout" onClick={handleLogout} />
            </>
          ) : (
            <MenuItem setActive={setActive} active={active} item="Login" onClick={handleLoginClick} />
          )}
        </div>
        
      </Menu>
    </div>
  );
}

export default Navbar;
