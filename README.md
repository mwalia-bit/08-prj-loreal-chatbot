L'Oréal Beauty Advisor — README
Overview
This project is an interactive L’Oréal Beauty Advisor chatbot.
Users can ask for recommendations about skincare, haircare, makeup, or fragrance, and the chatbot responds using an AI assistant powered through a Cloudflare Worker connected to the OpenAI API.
The final experience includes:
A branded L’Oréal interface
An interactive chat window
User & AI message bubbles
A typing animation while the AI responds
A product-themed background image
Mobile-responsive layout
This project was built for educational purposes only.
✨ Features
1. AI-Powered Chat Responses
Uses a Cloudflare Worker as a backend endpoint
Worker communicates with the OpenAI API (gpt-5-mini)
Chat remembers previous messages using a conversation history array
2. Clean L’Oréal-Inspired UI
Black & gold color palette based on L’Oréal brand identity
Lightened product background image
Centered chat box with rounded corners
Modern, elegant typography (Playfair Display + Montserrat)
3. Message Bubble Styling
User messages appear on the right (black bubbles)
AI messages appear on the left (white + gold border bubbles)
Supports multi-line and long responses
Smooth scroll-to-bottom behavior
4. Typing Indicator
Animated "typing dots" bubble shows while the AI generates a reply
Helps the chatbot feel more realistic and interactive
5. Fully Responsive Layout
Scales correctly on desktop, tablet, and mobile
Chat box stays centered on all screen sizes
