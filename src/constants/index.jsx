import {  Home,  Package, PackagePlus, ShoppingBag, UserPlus, Users, ListChecks, MessageSquare, Calendar } from "lucide-react";
import ProfileImage from "../assets/profile-image.jpg";

export const navbarLinks = [
    {
        title: "Dashboard",
        links: [
            {
                label: "Dashboard",
                icon: Home,
                path: "/admin/dashboard",
            },
            
        ],
    },
    {
        title: "Utilisateurs",
        links: [
            {
                label: "Liste des Utilisateurs",
                icon: Users,
                path: "/admin/users",
            },
        ],
    },

    {
        title: "Admin",
        links: [
            {
                label: "Liste des Admins",
                icon: Users,
                path: "/admin/admins",
            },
            {
                label: "Nouvel Admin",
                icon: UserPlus,
                path: "/admin/new-admin",
            },
           
        ],
    },
    {
        title: "Agents",
        links: [
            {
                label: "Nouvel Agent",
                icon: UserPlus,
                path: "/admin/new-agent",
            },
            {
                label: "Liste des Agents",
                icon: Users,
                path: "/admin/agents",
            },
        ],
    },
    {
        title: "Contenus",
        links: [
            {
                label: "Actualités",
                icon: Package,
                path: "/admin/news",
            },
            {
                label: "Nouvelle Actualité",
                icon: PackagePlus,
                path: "/admin/new-news",
            },
            {
                label: "Blogs",
                icon: ShoppingBag,
                path: "/admin/blogs",
            },
            {
                label: "Nouveau Blogs",
                icon: PackagePlus,
                path: "/admin/new-blogs",
            },
        ],
    },
    {
        title: "Sondages",
        links: [
            {
                label: "Sondages",
                icon: ListChecks,
                path: "/admin/polls",
            },
            {
                label: "Nouveau Sondage",
                icon: PackagePlus,
                path: "/admin/new-poll",
            },
            {
                label: "visualiser Sondages",
                icon: PackagePlus,
                path: "/admin/view-polls",
            },
        ],
    },
    {
        title: "Suggestions",
        links: [
            {
                label: "Suggestions",
                icon: MessageSquare,
                path: "/admin/suggestions",
            },
        ],
    },
    {
        title: "Événements",
        links: [
            {
                label: "Événements",
                icon: Calendar,
                path: "/admin/events",
            },
            {
                label: "Nouvel Événement",
                icon: PackagePlus,
                path: "/admin/new-event",
            },
        ],
    },
     {
         title: "Profil",
    links: [
             {
                 label: "Profil",
                 icon: Users,
                 path: "/admin/profile",
             },
         ],
     },
    
    // {
    //     title: "Paramètres",
    //     links: [
    //         {
    //             label: "Paramètres",
    //             icon: Settings,
    //             path: "/admin/settings",
    //         },
    //     ],
    // },
    
];
export const overviewData = [
    {
        name: "Jan",
        total: 1500,
    },
    {
        name: "Feb",
        total: 2000,
    },
    {
        name: "Mar",
        total: 1000,
    },
    {
        name: "Apr",
        total: 5000,
    },
    {
        name: "May",
        total: 2000,
    },
    {
        name: "Jun",
        total: 5900,
    },
    {
        name: "Jul",
        total: 2000,
    },
    {
        name: "Aug",
        total: 5500,
    },
    {
        name: "Sep",
        total: 2000,
    },
    {
        name: "Oct",
        total: 4000,
    },
    {
        name: "Nov",
        total: 1500,
    },
    {
        name: "Dec",
        total: 2500,
    },
];

export const recentSalesData = [
    {
        id: 1,
        name: "Olivia Martin",
        email: "olivia.martin@email.com",
        image: ProfileImage,
        total: 1500,
    },
    {
        id: 2,
        name: "James Smith",
        email: "james.smith@email.com",
        image: ProfileImage,
        total: 2000,
    },
    {
        id: 3,
        name: "Sophia Brown",
        email: "sophia.brown@email.com",
        image: ProfileImage,
        total: 4000,
    },
    {
        id: 4,
        name: "Noah Wilson",
        email: "noah.wilson@email.com",
        image: ProfileImage,
        total: 3000,
    },
    {
        id: 5,
        name: "Emma Jones",
        email: "emma.jones@email.com",
        image: ProfileImage,
        total: 2500,
    },
    {
        id: 6,
        name: "William Taylor",
        email: "william.taylor@email.com",
        image: ProfileImage,
        total: 4500,
    },
    {
        id: 7,
        name: "Isabella Johnson",
        email: "isabella.johnson@email.com",
        image: ProfileImage,
        total: 5300,
    },
];
