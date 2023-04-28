import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const TopScroll = () => {
  const location = useLocation();
  // Get Top Screen
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return;
};

export default TopScroll;
