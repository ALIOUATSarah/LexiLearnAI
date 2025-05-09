export const courseData = {
  physics101: {
    title: "Physics 101: Mechanics and Motion",
    code: "PHY101",
    description:
      "A comprehensive introduction to classical mechanics, forces, motion, and energy - the foundation of physics.",
    lessons: [
      {
        id: 1,
        title: "Introduction to Physics",
        content:
          "Physics is the natural science that studies matter, its fundamental constituents, its motion and behavior through space and time, and the related entities of energy and force. Physics is one of the most fundamental scientific disciplines, with its main goal being to understand how the universe behaves. This lesson explores the scientific method, physical quantities, and measurement systems that form the foundation of all physics studies.",
        sections: [
          "The Scientific Method: Observation, hypothesis formation, experimentation, analysis, and theory development",
          "SI Units and Measurement: Length (meters), time (seconds), mass (kilograms), and derived units",
          "Dimensional Analysis: Ensuring mathematical consistency in physical equations and problem-solving",
          "History of Physics: From Aristotle and Galileo to Newton and Einstein - the evolution of our understanding of physical laws",
        ],
        materials: [
          {
            id: 1,
            title: "Lecture Slides - Introduction to Physics",
            type: "slides",
            url: "#",
            downloadUrl: "/downloads/physics101_intro_slides.pdf",
            completed: true,
          },
          {
            id: 2,
            title: "Physics Fundamentals - Reading Material",
            type: "reading",
            url: "#",
            downloadUrl: "/downloads/physics101_fundamentals.pdf",
            completed: true,
          },
          {
            id: 3,
            title: "Introduction Video: The Nature of Physics",
            type: "video",
            url: "#",
            previewImage: "/images/physics_intro_preview.jpg",
            duration: "18:35",
            completed: false,
          },
        ],
      },
      {
        id: 2,
        title: "Newton's Laws of Motion",
        content:
          "Newton's laws of motion are three physical laws that together laid the foundation for classical mechanics. They describe the relationship between a body and the forces acting upon it, and its motion in response to those forces. These laws have been verified by countless experiments and observations over centuries and remain fundamental to our understanding of the physical world. This lesson provides a detailed explanation of each law, with real-world applications and mathematical formulations.",
        sections: [
          "First Law (Law of Inertia): An object at rest stays at rest, and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an external force. Examples: seat belts, tablecloth trick, space motion.",
          "Second Law (F = ma): The vector sum of the forces F on an object is equal to the mass m of that object multiplied by the acceleration a of the object. Applications: rocket propulsion, car acceleration, elevator motion.",
          "Third Law (Action-Reaction): For every action, there is an equal and opposite reaction. Illustrations: rocket propulsion, walking mechanics, recoil in firearms.",
          "Practical Applications: Engineering design principles, sports biomechanics, transportation systems, and everyday phenomena explained by Newton's laws.",
        ],
        materials: [
          {
            id: 4,
            title: "Newton's Laws - Interactive Presentation",
            type: "slides",
            url: "#",
            downloadUrl: "/downloads/newtons_laws_interactive.pptx",
            completed: false,
          },
          {
            id: 5,
            title: "Newton's Laws - Problem Set with Solutions",
            type: "worksheet",
            url: "#",
            downloadUrl: "/downloads/newton_laws_problems.pdf",
            completed: false,
          },
          {
            id: 6,
            title: "Video Demonstrations: Newton's Laws in Action",
            type: "video",
            url: "#",
            previewImage: "/images/newton_laws_demo.jpg",
            duration: "24:12",
            completed: false,
          },
        ],
      },
      {
        id: 3,
        title: "Energy and Work",
        content:
          "Energy is one of the most fundamental concepts in physics, existing in many forms such as kinetic, potential, thermal, and electromagnetic. This lesson explores the relationship between energy and work, the conservation of energy principle, and how energy transformations drive virtually all natural and technological processes. Through mathematical derivations and practical examples, you'll understand how energy analysis provides powerful insights into physical systems.",
        sections: [
          "Work and Energy Defined: Mathematical relationship (W = F·d·cosθ), positive and negative work, joules as units",
          "Kinetic Energy: Energy of motion (KE = ½mv²), examples in transportation, sports, and ballistics",
          "Potential Energy: Gravitational potential energy (PE = mgh), elastic potential energy (PE = ½kx²), chemical and nuclear potential energy",
          "Conservation of Energy: The principle that energy cannot be created or destroyed, only transformed; applications in engineering design and natural systems",
          "Power: Rate of energy transfer or work done (P = W/t), measured in watts, applications in engines, electronics, and human performance",
        ],
        materials: [
          {
            id: 7,
            title: "Energy and Work - Comprehensive Lecture Notes",
            type: "reading",
            url: "#",
            downloadUrl: "/downloads/energy_work_notes.pdf",
            completed: false,
          },
          {
            id: 8,
            title:
              "Energy Calculations - Practice Problems with Step-by-Step Solutions",
            type: "worksheet",
            url: "#",
            downloadUrl: "/downloads/energy_practice_problems.pdf",
            completed: false,
          },
          {
            id: 9,
            title: "Energy Transformations - Interactive Simulation",
            type: "interactive",
            url: "/simulations/energy-transformations",
            completed: false,
          },
        ],
      },
    ],
    quizData: {
      title: "Physics 101 Midterm Assessment",
      timeLimit: 45, // minutes
      passingScore: 70,
      questions: [
        {
          id: 1,
          question:
            "Which of Newton's laws states that an object at rest will remain at rest unless acted upon by an external force?",
          options: ["First Law", "Second Law", "Third Law", "Fourth Law"],
          correctAnswer: "First Law",
          explanation:
            "Newton's First Law, also known as the Law of Inertia, states that an object at rest stays at rest and an object in motion stays in motion with the same speed and in the same direction unless acted upon by an external force.",
        },
        {
          id: 2,
          question:
            "If a 2 kg object experiences a net force of 10 N, what is its acceleration?",
          options: ["2 m/s²", "5 m/s²", "8 m/s²", "10 m/s²"],
          correctAnswer: "5 m/s²",
          explanation:
            "Using Newton's Second Law (F = ma), we can calculate: a = F/m = 10 N / 2 kg = 5 m/s²",
        },
      ],
    },
  },
  math201: {
    title: "Mathematics 201: Calculus & Differential Equations",
    code: "MAT201",
    description:
      "Advanced calculus techniques and their applications in solving differential equations for science and engineering problems.",
    lessons: [
      {
        id: 1,
        title: "Functions and Limits",
        content:
          "Functions and limits form the conceptual foundation of calculus. This lesson explores the precise mathematical definition of limits, techniques for evaluating them, and how they connect to the continuity of functions. Understanding these concepts is essential for developing the derivative and integral calculus that follows. We'll examine various function types and their limit behavior, including special cases and indeterminate forms.",
        sections: [
          "Function fundamentals: Domain, range, representations (algebraic, graphical, numerical, verbal), and key function families",
          "Limit concept: Informal and formal (ε-δ) definitions, one-sided limits, limits at infinity, and infinite limits",
          "Limit evaluation techniques: Direct substitution, factoring, rationalization, and L'Hôpital's rule",
          "Continuity: Definition, types of discontinuities, and the Intermediate Value Theorem with applications",
          "Asymptotic behavior: Vertical and horizontal asymptotes, end behavior of functions",
        ],
        materials: [
          {
            id: 10,
            title: "Functions and Limits - Comprehensive Lecture Slides",
            type: "slides",
            url: "#",
            downloadUrl: "/downloads/functions_limits_slides.pdf",
            completed: true,
          },
          {
            id: 11,
            title: "Limits Workbook with Solved Examples",
            type: "reading",
            url: "#",
            downloadUrl: "/downloads/limits_workbook.pdf",
            completed: true,
          },
          {
            id: 12,
            title: "Video Lecture: Mastering Limits and Continuity",
            type: "video",
            url: "#",
            previewImage: "/images/limits_lecture.jpg",
            duration: "32:45",
            completed: false,
          },
          {
            id: 13,
            title: "Interactive Limit Explorer Tool",
            type: "interactive",
            url: "/tools/limit-explorer",
            completed: false,
          },
        ],
      },
      {
        id: 2,
        title: "Derivatives and Differentiation",
        content:
          "The derivative represents the rate of change of a function and is one of the two main concepts in calculus. This lesson covers the definition of the derivative, differentiation rules, and applications of derivatives in various fields. We'll develop both the conceptual understanding and computational skills needed to apply derivatives to real-world problems.",
        sections: [
          "Definition of the derivative: As a limit of the difference quotient, slope of the tangent line, and instantaneous rate of change",
          "Differentiation rules: Power rule, product rule, quotient rule, chain rule, and implicit differentiation",
          "Derivatives of transcendental functions: Trigonometric, exponential, logarithmic, and inverse functions",
          "Higher-order derivatives: Meaning and applications in physics (velocity, acceleration, jerk) and other fields",
          "Applications: Related rates, optimization problems, linear approximation, and L'Hôpital's rule",
        ],
        materials: [
          {
            id: 14,
            title: "Differentiation Techniques - Comprehensive Guide",
            type: "reading",
            url: "#",
            downloadUrl: "/downloads/differentiation_guide.pdf",
            completed: false,
          },
          {
            id: 15,
            title: "Derivatives Practice Problems with Step-by-Step Solutions",
            type: "worksheet",
            url: "#",
            downloadUrl: "/downloads/derivatives_practice.pdf",
            completed: false,
          },
          {
            id: 16,
            title: "Derivative Applications - Interactive Demonstrations",
            type: "interactive",
            url: "/tools/derivative-applications",
            completed: false,
          },
        ],
      },
      {
        id: 3,
        title: "Integration and Differential Equations",
        content:
          "Integration is the second fundamental concept of calculus, representing accumulation and area under curves. This lesson connects integration to antiderivatives, develops integration techniques, and introduces ordinary differential equations. You'll learn how these powerful mathematical tools model and solve problems in physics, engineering, economics, and other fields.",
        sections: [
          "Definite and indefinite integrals: Definitions, properties, and the Fundamental Theorem of Calculus",
          "Integration techniques: Substitution, integration by parts, partial fractions, and trigonometric substitutions",
          "Applications of integration: Area, volume, arc length, surface area, and physical applications",
          "Ordinary differential equations: First-order separable equations, linear equations, and applications",
          "Systems modeling: Using differential equations to model population growth, heating/cooling, and mechanical systems",
        ],
        materials: [
          {
            id: 17,
            title: "Integration Techniques - Comprehensive Reference",
            type: "reading",
            url: "#",
            downloadUrl: "/downloads/integration_techniques.pdf",
            completed: false,
          },
          {
            id: 18,
            title: "Differential Equations - Worked Examples and Solutions",
            type: "worksheet",
            url: "#",
            downloadUrl: "/downloads/differential_equations_examples.pdf",
            completed: false,
          },
          {
            id: 19,
            title: "Interactive Differential Equation Solver",
            type: "interactive",
            url: "/tools/differential-equation-solver",
            completed: false,
          },
        ],
      },
    ],
    quizData: {
      title: "Calculus Midterm Assessment",
      timeLimit: 60, // minutes
      passingScore: 75,
      questions: [
        {
          id: 1,
          question: "Find the derivative of f(x) = x³sin(x)",
          options: [
            "3x²sin(x) + x³cos(x)",
            "3x²sin(x) - x³cos(x)",
            "3x²sin(x)",
            "x³cos(x)",
          ],
          correctAnswer: "3x²sin(x) + x³cos(x)",
          explanation:
            "Using the product rule: f'(x) = (x³)'sin(x) + x³(sin(x))' = 3x²sin(x) + x³cos(x)",
        },
        {
          id: 2,
          question: "Evaluate the limit: lim(x→0) (sin(3x)/x)",
          options: ["0", "1", "3", "∞"],
          correctAnswer: "3",
          explanation:
            "Using the limit property lim(x→0) sin(x)/x = 1, we have: lim(x→0) sin(3x)/x = lim(x→0) 3(sin(3x)/3x) = 3 × 1 = 3",
        },
      ],
    },
  },
  cs301: {
    title: "Computer Science 301: Data Structures & Algorithms",
    code: "CS301",
    description:
      "Advanced data structures, algorithm design techniques, and complexity analysis for efficient problem-solving.",
    lessons: [
      {
        id: 1,
        title: "Algorithm Analysis and Complexity",
        content:
          "Algorithm analysis involves evaluating the efficiency of algorithms in terms of time (how long it takes to run) and space (how much memory it requires). This lesson covers asymptotic notation (Big O, Omega, Theta), complexity classes, and techniques for analyzing iterative and recursive algorithms. Understanding algorithm complexity is essential for designing efficient solutions to computational problems.",
        sections: [
          "Asymptotic Analysis: Big O, Omega, and Theta notations for expressing algorithm efficiency",
          "Time Complexity: Analyzing operations count and execution time across different input sizes",
          "Space Complexity: Evaluating memory usage requirements and optimization techniques",
          "Complexity Classes: Constant, logarithmic, linear, polynomial, exponential, and factorial complexities",
          "Amortized Analysis: Evaluating performance over a sequence of operations rather than worst-case individual operations",
        ],
        materials: [
          {
            id: 20,
            title: "Algorithm Analysis - Comprehensive Guide",
            type: "reading",
            url: "#",
            downloadUrl: "/downloads/algorithm_analysis.pdf",
            completed: true,
          },
          {
            id: 21,
            title: "Complexity Analysis Video Lecture",
            type: "video",
            url: "#",
            previewImage: "/images/complexity_analysis.jpg",
            duration: "28:15",
            completed: true,
          },
          {
            id: 22,
            title: "Algorithm Analysis Practice Problems",
            type: "worksheet",
            url: "#",
            downloadUrl: "/downloads/algorithm_problems.pdf",
            completed: false,
          },
          {
            id: 23,
            title: "Algorithm Visualization Tool",
            type: "interactive",
            url: "/tools/algorithm-visualizer",
            completed: false,
          },
        ],
      },
      {
        id: 2,
        title: "Advanced Data Structures",
        content:
          "Data structures are specialized formats for organizing, processing, retrieving, and storing data. This lesson covers advanced data structures beyond the basics, focusing on their implementation, operations, and appropriate use cases. You'll learn how to select and utilize the right data structure to optimize algorithm performance for specific problem domains.",
        sections: [
          "Self-balancing Trees: AVL trees, Red-Black trees, and B-trees for maintaining logarithmic operations",
          "Hash Tables: Advanced hashing techniques, collision resolution, and perfect hashing",
          "Heaps and Priority Queues: Binary heaps, Fibonacci heaps, and applications in graph algorithms",
          "Graph Representations: Adjacency matrices, adjacency lists, and specialized structures for efficient graph operations",
          "Advanced String Data Structures: Tries, suffix trees/arrays, and their applications in text processing",
        ],
        materials: [
          {
            id: 24,
            title: "Advanced Data Structures - Technical Reference",
            type: "reading",
            url: "#",
            downloadUrl: "/downloads/advanced_data_structures.pdf",
            completed: false,
          },
          {
            id: 25,
            title:
              "Data Structure Implementation Examples in Multiple Languages",
            type: "code",
            url: "#",
            downloadUrl: "/downloads/data_structures_implementations.zip",
            completed: false,
          },
          {
            id: 26,
            title: "Interactive Data Structure Visualizer",
            type: "interactive",
            url: "/tools/data-structure-visualizer",
            completed: false,
          },
        ],
      },
      {
        id: 3,
        title: "Algorithm Design Paradigms",
        content:
          "Algorithm design paradigms are general approaches to solving algorithmic problems. This lesson explores common paradigms that provide frameworks for developing efficient algorithms across different problem domains. Understanding these paradigms helps in recognizing patterns in problems and applying proven solution strategies.",
        sections: [
          "Divide and Conquer: Breaking problems into subproblems, solving them independently, and combining results",
          "Dynamic Programming: Solving complex problems by breaking them down into simpler overlapping subproblems",
          "Greedy Algorithms: Making locally optimal choices at each stage with the hope of finding a global optimum",
          "Backtracking: Building solutions incrementally and abandoning solutions that fail to satisfy constraints",
          "Randomized Algorithms: Using random numbers to determine the next step in computation for improved average-case performance",
        ],
        materials: [
          {
            id: 27,
            title: "Algorithm Design Paradigms - Comprehensive Guide",
            type: "reading",
            url: "#",
            downloadUrl: "/downloads/algorithm_design_paradigms.pdf",
            completed: false,
          },
          {
            id: 28,
            title: "Case Studies: Algorithm Design in Real-world Applications",
            type: "video",
            url: "#",
            previewImage: "/images/algorithm_case_studies.jpg",
            duration: "42:30",
            completed: false,
          },
          {
            id: 29,
            title: "Algorithm Design Challenges with Solutions",
            type: "worksheet",
            url: "#",
            downloadUrl: "/downloads/algorithm_challenges.pdf",
            completed: false,
          },
        ],
      },
    ],
    quizData: {
      title: "Data Structures & Algorithms Assessment",
      timeLimit: 75, // minutes
      passingScore: 80,
      questions: [
        {
          id: 1,
          question:
            "What is the time complexity of binary search on a sorted array?",
          options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
          correctAnswer: "O(log n)",
          explanation:
            "Binary search repeatedly divides the search space in half, leading to a logarithmic time complexity of O(log n).",
        },
        {
          id: 2,
          question:
            "Which data structure provides O(1) average time complexity for insertion, deletion, and search operations?",
          options: ["Array", "Linked List", "Binary Search Tree", "Hash Table"],
          correctAnswer: "Hash Table",
          explanation:
            "Hash tables provide constant-time O(1) average complexity for basic operations through direct addressing based on the hash of the key.",
        },
      ],
    },
  },
};
