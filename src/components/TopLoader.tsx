'use client';

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function TopLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500); // زمان نمایش لودینگ

    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <div
      className={`fixed top-0 left-0 h-[3px] bg-blue-500 z-[9999] transition-all duration-500 ${
        loading ? "w-full opacity-100" : "w-0 opacity-0"
      }`}
    />
  );
}
// 'use client';

// import { usePathname, useSearchParams } from 'next/navigation';
// import { useEffect, useState } from 'react';

// export default function TopLoader() {
//   const pathname = usePathname();
//   const searchParams = useSearchParams();
//   const [isLoading, setIsLoading] = useState(false);
//   const [progress, setProgress] = useState(0);
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true); // Mark as mounted on client-side
//   }, []);

//   useEffect(() => {
//     if (!mounted) return; // Only run on client

//     const handleRouteChangeStart = () => {
//       setIsLoading(true);
//       setProgress(10); // Start with a small progress
//       const interval = setInterval(() => {
//         setProgress((prev) => {
//           if (prev < 90) {
//             return prev + Math.random() * 5; // Increment progress randomly
//           }
//           return prev;
//         });
//       }, 100); // Update progress every 100ms

//       // When the route actually starts changing (pathname changes),
//       // we can increase progress faster or finalize it.
//       // However, the exact "click" event isn't directly accessible here
//       // without modifying Link components. This simulates progress during transition.

//       return () => clearInterval(interval); // Cleanup interval on start
//     };

//     const handleRouteChangeComplete = () => {
//       setIsLoading(false);
//       setProgress(100); // Finalize progress
//       setTimeout(() => setProgress(0), 300); // Reset after a short delay
//     };

//     // Detect route changes based on pathname and searchParams
//     // This is a proxy for actual navigation events in App Router
//     const initialPath = pathname + searchParams.toString();
//     let previousPath = initialPath;

//     const observer = new MutationObserver(() => {
//         const currentPath = pathname + searchParams.toString();
//         if (previousPath !== currentPath) {
//             previousPath = currentPath;
//             handleRouteChangeStart();
//             // Simulate route completion after a delay
//             setTimeout(() => {
//                 handleRouteChangeComplete();
//             }, 500); // Adjust this delay based on your perceived load times
//         }
//     });

//     // Observe changes in the DOM that might indicate route changes.
//     // This is a heuristic and might need adjustment.
//     // A more robust solution would involve patching Link or using next/router events if available.
//     // For now, let's just rely on the useEffect dependency array.

//      // Trigger start when pathname or searchParams change
//     if (pathname || searchParams) {
//         handleRouteChangeStart();
//          const timer = setTimeout(() => {
//             handleRouteChangeComplete();
//         }, 500); // Adjust delay as needed

//         return () => {
//             clearTimeout(timer);
//             // Ensure cleanup if component unmounts before timer finishes
//             setIsLoading(false);
//             setProgress(0);
//         };
//     }

//   }, [pathname, searchParams, mounted]);

//   // Render the progress bar visually
//   return (
//     <div
//       style={{
//         height: '4px',
//         backgroundColor: isLoading ? 'red' : 'transparent', // Red when loading, transparent otherwise
//         width: `${progress}%`,
//         position: 'fixed',
//         top: 0,
//         left: 0,
//         right: 0,
//         zIndex: 9999,
//         transition: 'width 0.3s ease-out, background-color 0.3s ease-out',
//       }}
//     />
//   );
// }
