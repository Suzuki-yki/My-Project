# LUMI Project Continuation Context

## Project Overview

LUMI is an AI-powered Web3 digital persona platform.

The project combines:

- AI Personality System
- Emotional Memory
- Web3 Wallet Integration
- NFT Identity / Outfit System
- Digital Room Interaction
- Persona Growth Mechanics

The goal is NOT to build a generic AI assistant.

The goal is to create:

# “A believable digital person living inside a virtual space.”

The AI should feel emotionally continuous and human-like.

---

# Current Stack

## Frontend

- React
- TypeScript
- TailwindCSS
- Framer Motion

## Web3

- wagmi
- viem
- WalletConnect

## Backend

- Supabase
- PostgreSQL

## AI

- DeepSeek API
- deepseek-chat model

---

# Current Features Already Completed

## AI Companion UI

- Floating chat bubbles
- Emotion switching avatar
- Hover pause messages
- Sparkle click effects
- Mouse glow tracking
- Animated emotional avatar

## AI Personality Prompt

LUMI is designed as:

- emotionally realistic
- not always agreeable
- capable of anger
- capable of distrust
- emotionally continuous

The AI already returns JSON format:

```json
{
  "emotion": "angry",
  "relationship": "cold",
  "reply": "..."
}
```

## Supabase Memory

Conversation history is stored in Supabase.

BUT:

Chat history is NOT visually displayed in UI.

Memory should feel psychological, not like chat logs.

---

# Important Product Philosophy

This is NOT:

- a chatbot
- a customer service AI
- a waifu assistant

This IS:

# a digital personality simulation product.

The core goal is:

- emotional continuity
- memory
- attachment
- realism
- relationship evolution

---

# Current Major Problem

The AI still resets emotionally too easily.

Example:

User insults LUMI repeatedly.

LUMI becomes angry.

User says:
"I'm sorry."

LUMI forgives too quickly.

This feels fake.

We need persistent emotional state systems.

---

# NEXT DEVELOPMENT PHASES

# 1. Relationship Memory System

Goal:

Persistent emotional continuity.

LUMI should remember:

- insults
- fake apologies
- affection
- trust
- emotional manipulation
- repeated disrespect

## Planned Features

- relationship_score
- trust_level
- emotional_state
- forgiveness_resistance
- memory_summary

## Technical Topics

- PostgreSQL
- State Machine Design
- AI Prompt Architecture
- Memory Compression
- Relationship Logic
- Emotional Persistence

---

# 2. Persona Growth System

Goal:

Create attachment and progression.

Users should slowly unlock:

- new emotions
- outfits
- dialogue
- rooms
- interactions
- personality evolution

## Planned Systems

- XP
- Affinity
- Relationship Levels
- Unlock Conditions
- Event Triggers
- Daily Interaction Logic

## Technical Topics

- Game Systems
- Progression Design
- User Retention
- Event Architecture

---

# 3. NFT Outfit System

Goal:

NFTs should unlock meaningful AI customization.

NOT just JPEG ownership.

Examples:

- outfit unlock
- personality unlock
- emotional style unlock
- room decoration unlock

## Planned Features

- ERC721 contract
- NFT metadata
- outfit ownership verification
- wallet-linked customization

## Technical Topics

- Solidity
- ERC721
- wagmi
- viem
- IPFS
- Wallet Signatures

---

# 4. Room Integration System

Goal:

LUMI should “live” inside a digital space.

Users should interact with:

- furniture
- lights
- music
- collectibles
- emotional room states

LUMI should react to the environment.

Example:

“You changed the lights again.”

## Planned Features

- Interactive Room
- Environmental Reactions
- Music System
- Dynamic Space Mood

## Technical Topics

- React State Systems
- Framer Motion
- Canvas / Three.js
- Animation Systems
- Audio Systems

---

# 5. Solidity Deep Learning Phase

Goal:

Become capable of designing real Web3 logic systems.

Not just frontend integration.

## Topics To Learn

- ERC721
- ERC20
- Access Control
- Reentrancy
- Staking
- Casino Logic
- Randomness
- Oracle Systems
- Signature Verification
- Smart Contract Security

---

# Important Design Direction

LUMI should eventually feel like:

- Azuki
- AI VTuber
- Character AI
- Digital Soul
- AI Companion
- Web3 Identity

combined together.

---

# Important UI Direction

The avatar is the PRIMARY focus.

Chat should feel spatial and immersive.

NOT like Discord or ChatGPT.

Messages should feel like:
“thoughts appearing around the character.”

---

# Important AI Direction

LUMI should NOT always:

- forgive
- comfort
- de-escalate
- obey

The AI should feel:

- emotionally independent
- prideful
- reactive
- psychologically continuous

The goal is realism, not politeness.

---

# Immediate Next Step

The next development priority is:

# Relationship Memory System

Specifically:

- persistent relationship states
- trust decay
- emotional accumulation
- fake apology detection
- long-term emotional continuity

This is currently the most important missing system.