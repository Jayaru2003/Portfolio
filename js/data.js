// Portfolio Data - Edit this file to customize your portfolio
const portfolioData = {
    // Personal Information
    profile: {
        fullName: "Jayaru Manilka",
        title: "Cloud Engineer & Problem Solver",
        bio: "I build exceptional digital experiences that make people's lives easier.",
        aboutDescription: "I am a Cloud Engineer and Frontend Developer with hands-on experience across AWS, Azure, and Google Cloud Platform (GCP). I specialize in designing, deploying, and managing scalable cloud infrastructure while building responsive and user-friendly frontend applications.I have practical experience with DevOps tools and practices, including Docker for containerization, CI/CD pipelines for automated builds and deployments, and Terraform for Infrastructure as Code (IaC). I enjoy automating workflows, optimizing cloud resources, and ensuring reliable, secure deployments from development to production.By combining cloud engineering, DevOps, and frontend development, I focus on delivering high-performance, scalable, and visually polished applications",
        profileImageUrl: "https://github.com/Jayaru2003/images/blob/main/DF%20(421).jpg?raw=true",
        cvUrl: "#", // Link to your CV/Resume
        emailAddress: "jayarumanilka@gmail.com",
        phoneNumber: "+94 70 679 6634",
        location: "268/C, Polhenawatta, Gonamulla, Galle, Sri Lanka",
        githubUrl: "https://github.com/Jayaru2003",
        linkedinUrl: "https://www.linkedin.com/in/jayaru-manilka-85b3192aa",
        instagramUrl: "https://www.instagram.com/jaya_ru/",
        projectsCompleted: 3,
        happyClients: 0,
        yearsExperience: 0
    },

    // Projects
    projects: [
        {
            id: 1,
            title: "Teslang Compiler",
            description: "A Create a DSL (TestLang++) to describe HTTP tests (GET/POST/PUT/DELETE, headers, body, assertions). Implement a scanner and parser (Lex/Yacc or JFlex/CUP) that translate .test files into a single GeneratedTests.java JUnit 5 class. Compile and run the generated tests against a local backend",
            imageUrl: "https://raw.githubusercontent.com/Jayaru2003/images/refs/heads/main/WhatsApp%20Image%202026-01-09%20at%205.53.51%20PM.jpeg",
            techStack: "Lex,Yacc,Java Spring Boot",
            githubUrl: "https://github.com/Jayaru2003/testlang-compiler",
           // demoUrl: "https://demo-project1.com"
        },
     
     {
            id: 2,
            title: "Cloth-Heavan E-commerce Website",
            description: "Cloth Haven is a modern full-stack e-commerce application built using Spring Boot for the backend and React + TypeScript for the frontend. The platform includes secure user authentication, profile management, a responsive UI, and a fully structured REST API connected to a MySQL database. Core e-commerce features such as product management, shopping cart, order processing, and payments are currently in development.",
            imageUrl: "https://raw.githubusercontent.com/Jayaru2003/images/refs/heads/main/WhatsApp%20Image%202026-01-09%20at%205.53.51%20PM.jpeg",
            techStack: "Java,spring boot,HTML,CSS,JavaScript,react",
            githubUrl: "https://github.com/Jayaru2003/Cloth-Haven.git",
            demoUrl: "https://drive.google.com/file/d/1ciE72vGYggRwao9NxhAWwWi5lW4zZrIM/view?usp=drivesdk"
        },    
    ],

    // Skills
    skills: {
        cloud: ["Azure", "AWS"],
        frontend: ["JavaScript", "HTML"],
        backend: ["Java", "Spring Boot"],
        languages: ["Java", "Python", "C"],
        tools: ["Docker", "Git"]
    }
};

// Export the data
export default portfolioData;
