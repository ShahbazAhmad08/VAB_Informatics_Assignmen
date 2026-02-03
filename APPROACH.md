# APPROACH

## Overview

This project implements a **rule-based Task Decomposition Engine** that converts unclear and human-written project descriptions into structured and actionable task plans. The main objective of this assignment was to demonstrate **logical thinking, problem decomposition, and backend fundamentals**, rather than building a perfect or production-ready system.

The system is intentionally built **without using any AI APIs**. All decisions are made using simple rules, heuristics, and basic algorithms, similar to how a junior-to-mid level developer would approach planning a project with guidance from best practices.

---

## How I Approached the Problem

As a junior developer, I approached this problem step by step by first understanding what the system is expected to do, and then breaking it into smaller, manageable parts.

I treated the project description as an **imperfect input** that may contain missing details, contradictions, or vague requirements. My goal was to design a backend system that can still produce a reasonable task breakdown while clearly pointing out risks and uncertainties.

---

## Task Decomposition Strategy

### Rule-Based Feature Detection

I used a simple **keyword-based approach** to detect features from the project description. For example:

- "auth" or "login" → User Authentication
- "payment" → Payment Integration
- "mobile" → Responsive or Mobile-first Design
- "orders" → Order Management

Each detected feature is converted into smaller tasks with basic attributes such as estimated hours, priority, category, and dependencies. This approach keeps the logic easy to understand and maintain.

---

## Handling Implicit Dependencies

Some features naturally depend on others, even if not explicitly mentioned in the description. For example:

- Payment functionality depends on user authentication
- Order management depends on having users and a database

These dependencies were added using predefined rules based on common development practices.

---

## Contradiction Detection

During analysis, I added simple checks to detect common contradictions found in real-world requirements, such as:

- "Simple" vs "Premium"
- Short timelines combined with large scope
- Fast delivery with limited resources

When such conflicts are detected, the system reports them along with a basic suggestion instead of trying to automatically resolve them.

---

## Ambiguity Detection and Clarification

Certain words like "fast", "modern", or "user-friendly" can be interpreted in multiple ways. When these terms are found, they are flagged as ambiguous.

The `/api/clarify` endpoint generates a list of clarifying questions to help reduce assumptions and improve requirement clarity.

---

## Dependency Graph and Cycle Detection

Tasks and their dependencies are represented as a **directed graph**.

To validate task order, I implemented a simple Depth-First Search (DFS) approach to detect circular dependencies such as A → B → C → A. If a cycle is found, it is reported so that the task plan can be corrected.

---

## Feasibility Calculation

Feasibility is calculated by comparing:

- Total estimated hours required to complete all tasks
- Total available hours based on team size and daily working hours

This produces a feasibility score between 0 and 1, which helps indicate whether the project timeline is realistic.

---

## API Design

The backend is divided into three main endpoints:

1. `/api/decompose` – Generates task breakdowns from project descriptions
2. `/api/validate` – Validates task dependencies and timeline feasibility
3. `/api/clarify` – Generates clarifying questions for ambiguous inputs

This separation keeps the code organized and easy to extend.

---

## Use of ChatGPT and Learning Resources

During development, I used **ChatGPT as a learning and support tool** to:

- Understand problem requirements
- Clarify concepts like dependency graphs and DFS
- Improve documentation wording

All core logic, rules, and implementation decisions were written and implemented by me. No AI-generated code or AI APIs are used in the final application.

---

## Trade-offs Made

- Natural language understanding is limited to keyword matching
- UI is kept minimal to focus on backend logic
- Task estimates are approximate and based on assumptions

These trade-offs were made to keep the solution simple and understandable within the given time constraints.

---

## What I Would Improve With More Time

- More advanced rule configuration instead of hard-coded logic
- Better ambiguity scoring
- Improved visualization of task dependencies
- More test cases for edge scenarios

---

## Conclusion

This assignment helped me strengthen my understanding of backend logic, dependency handling, and real-world requirement analysis. The project reflects my ability to learn quickly, apply structured thinking, and build a working solution while clearly identifying limitations and areas for improvement.
