# 🎯 GATE CS Syllabus Tracker

A modern, fast, and intuitive web application designed specifically for **GATE Computer Science & Information Technology (CS)** aspirants to track syllabus progress topic-by-topic, chapter-by-chapter, and monitor overall completion percentage.

---

## 🚀 Features

- **Pre-Configured with All 15 Official GATE CS Subjects**:
  1. Discrete Mathematics
  2. Linear Algebra
  3. Calculus
  4. Probability and Statistics
  5. General Aptitude
  6. Digital Logic
  7. Computer Organization & Architecture
  8. C Programming
  9. Data Structures
  10. Algorithms
  11. Theory of Computation
  12. Compiler Design
  13. Operating System
  14. Databases
  15. Computer Networks

- **Manual Chapter Management**:
  - Add chapters to any subject in real-time.
  - **Single Add**: Enter a chapter name and press Enter.
  - **Bulk Add**: Paste multiple chapters line-by-line in one go.
  - **Todo-Style Checkmarks**: Toggle chapters as completed/incompleted.
  - **Inline Editing**: Double-click or click the edit icon to rename any chapter.
  - **Revision Tracking**: Increment revision counter (`Rev 0`, `Rev 1`, `Rev 2`...) per chapter.

- **Real-Time Syllabus Analytics**:
  - **Overall Syllabus Completion Gauge**: Shows the total completed chapters out of total chapters and calculated percentage.
  - **Category-Wise Breakdown**: Visual progress bars for:
    - *Engineering Mathematics*
    - *Core Computer Science*
    - *General Aptitude*
  - **Subject-Wise Progress**: Individual progress bars and percentage on each subject card.
  - **Celebration Effects**: Confetti burst when checking off a chapter, and grand celebration when reaching 100% on a subject!

- **Organization & Search**:
  - **Search Bar**: Instant filter across both subject names and chapter titles.
  - **Category Filters**: Filter by *All*, *Engineering Mathematics*, *Core CS*, or *General Aptitude*.
  - **Smart Sorting**: Sort subjects by Default order, Name (A-Z), Lowest Progress (focus on weak spots), Highest Progress, or Chapter count.
  - **Expand/Collapse All**: Convenient toggles to declutter your workspace.

- **Data Persistence & Portability**:
  - **Automatic Local Storage**: All changes (chapters, completion status, revisions) persist across browser reloads.
  - **Export JSON**: Download a backup copy of your entire syllabus progress.
  - **Import JSON**: Restore your data on another computer or browser anytime.
  - **Reset Options**: Choose between resetting completion checkboxes or resetting back to empty subjects.

- **Exam Countdown**:
  - Built-in countdown timer showing days left until the GATE exam.
  - Customizable target exam date.

- **Aesthetic UI**:
  - Full **Dark Mode** and **Light Mode** support.
  - Responsive layout optimized for desktop, tablet, and mobile.

---

## 🛠️ Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open the provided URL (e.g. `http://localhost:5173`) in your browser.

### 3. Build for Production
```bash
npm run build
```
Creates an optimized static build in the `dist` folder.
