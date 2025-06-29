
Built by https://www.blackbox.ai

---

# SimuLearn

## Project Overview
SimuLearn is an interactive learning platform designed for high school students, featuring an AI Tutor and visual simulations. The platform helps students understand complex subjects like Mathematics and Physics in an engaging and effective manner.

## Installation
To get started with SimuLearn, you'll need to clone the repository and install the dependencies. If you don't have Node.js installed, please download and install it first.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/simulearn.git
   cd simulearn
   ```

2. **Install the dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000` to view the application.

## Usage
Once the server is running, you can explore the various features of SimuLearn. Use the navigation menu to access different sections, such as:
- **Fitur**: Explore the unique features of the platform.
- **Harga**: View different subscription packages.
- **Mulai Belajar**: Start your learning journey using the AI Tutor.

## Features
- **AI Tutor Personal**: Get 24/7 assistance from an AI Tutor tailored to your learning style.
- **Visual Simulations**: Engage with interactive simulations that simplify complex concepts.
- **Progress Tracking**: Monitor your learning progress with detailed analytics provided by the AI.

## Dependencies
SimuLearn utilizes several libraries to enhance its functionality. The primary dependencies include:
- `@supabase/auth-helpers-nextjs`: Authentication helpers for Next.js applications using Supabase.
- `@supabase/supabase-js`: JavaScript client for interacting with Supabase.
- `next`: The React framework for server-rendered applications.
- `react`: A JavaScript library for building user interfaces.
- `tailwindcss`: A utility-first CSS framework for rapid UI development.
- Various other libraries for automation, testing, and development utilities.

You can find the complete list of dependencies in the `package.json` file.

## Project Structure
Below is an overview of the project's directory structure:

```
simulearn/
│
├── public/                # Static assets such as images, fonts, etc.
│
├── src/                   # Source code for the application
│   ├── components/        # Reusable UI components
│   ├── pages/             # Next.js pages for routing
│   ├── styles/            # Global styles and Tailwind configuration
│   └── lib/               # Utility functions and helpers
│
├── index.html             # Main HTML file for the application
├── package.json           # Project metadata and dependencies
├── package-lock.json      # Dependency versions and lockfile
└── tsconfig.json          # TypeScript configuration
```

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any features or improvements you'd like to see.

## Contact
For any inquiries, please feel free to reach out at [your-email@example.com](mailto:your-email@example.com).