import type { JournalCardInterface ,JounalPageInterface } from "./types"

export const journalMockData: JournalCardInterface[] = [
  {
    id: "6b3f36c3-0419-42cd-9ac6-5ce7f7cc5292",
    title: "Daily Mind Dump",
    created_at: "2025-05-01T07:45:00Z",
    updated_at: "2025-05-01T08:10:00Z"
  },
  {
    id: "45c4a5b7-efb1-4dc6-a2ab-38c9e2df6a45",
    title: "Morning Routine Ideas",
    created_at: "2025-05-03T06:20:00Z",
    updated_at: "2025-05-03T06:55:00Z"
  },
  {
    id: "fdaf444e-7f43-47fc-b2b2-d0e5a6f79b77",
    title: "Evening Reflection",
    created_at: "2025-05-05T21:00:00Z",
    updated_at: "2025-05-05T21:30:00Z"
  },
  {
    id: "9d207c56-f60e-4036-8aa5-7ce1fc3423f3",
    title: "Weekend Planning",
    created_at: "2025-05-08T10:00:00Z",
    updated_at: "2025-05-08T10:45:00Z"
  },
  {
    id: "0ce56c90-8cb0-46f0-a4d1-65fd18220aa2",
    title: "Workout Log",
    created_at: "2025-05-10T09:15:00Z",
    updated_at: "2025-05-10T09:40:00Z"
  },
  {
    id: "aad49c71-942c-4be0-a69a-ff292dc13ce2",
    title: "Books I’m Reading",
    created_at: "2025-05-12T18:00:00Z",
    updated_at: "2025-05-13T08:30:00Z"
  },
  {
    id: "f80c8d36-cf20-4194-90fa-3e9c56ae614e",
    title: "Gratitude Entry",
    created_at: "2025-05-15T07:00:00Z",
    updated_at: "2025-05-15T07:20:00Z"
  },
  {
    id: "2d78a441-0eb8-4d34-bb2d-e6bd3a379dd3",
    title: "New Project Ideas",
    created_at: "2025-05-18T16:00:00Z",
    updated_at: "2025-05-18T17:10:00Z"
  },
  {
    id: "b8eb87b2-7fbd-403b-9c43-dc0efdc81b62",
    title: "Meal Prep Notes",
    created_at: "2025-05-20T11:00:00Z",
    updated_at: "2025-05-20T11:25:00Z"
  },
  {
    id: "75f7b849-21c4-41ce-9b17-748b82656f5a",
    title: "Random Thoughts",
    created_at: "2025-05-22T23:00:00Z",
    updated_at: "2025-05-23T00:00:00Z"
  }
]



export const journalPageMockData: JounalPageInterface[] = [
  {
    id: "6b3f36c3-0419-42cd-9ac6-5ce7f7cc5292",
    content: `This morning's mind dump really helped clear my thoughts. I woke up feeling a bit anxious, and instead of scrolling my phone, I sat down with coffee and started writing whatever came to mind. It ranged from tasks I need to do, things I’m worried about, to random ideas about projects I want to start. There’s something therapeutic about just letting thoughts out without editing. I think I’ll make this a habit before checking any notifications.`,
    created_at: "2025-05-01T07:45:00Z",
    updated_at: "2025-05-01T08:10:00Z"
  },
  {
    id: "45c4a5b7-efb1-4dc6-a2ab-38c9e2df6a45",
    content: `I’ve been exploring what makes a morning routine effective. Some ideas that came to mind: waking up with intention (no snooze), drinking water first thing, short mobility/stretching session, journaling 5–10 minutes, and doing one small but meaningful task to set the tone. Also considering adding a 10-minute meditation right before breakfast. The key is not cramming too much — just creating momentum and clarity.`,
    created_at: "2025-05-03T06:20:00Z",
    updated_at: "2025-05-03T06:55:00Z"
  },
  {
    id: "fdaf444e-7f43-47fc-b2b2-d0e5a6f79b77",
    content: `Tonight I spent some time reflecting on how I’ve been managing stress lately. It’s been better — I’ve started noticing my triggers and breathing before reacting. Work has been hectic, but I’m learning not to carry that energy into the evening. I'm ending today by journaling, drinking tea, and staying offline. Grateful for small wins like this.`,
    created_at: "2025-05-05T21:00:00Z",
    updated_at: "2025-05-05T21:30:00Z"
  },
  {
    id: "9d207c56-f60e-4036-8aa5-7ce1fc3423f3",
    content: `This weekend I want to focus on a mix of rest and productivity. Saturday: clean the apartment, grocery shop, prep meals. Sunday: long walk or hike in nature, read for at least an hour, and map out next week’s top 3 goals. Also planning a digital detox for 24 hours to reset my brain a bit. No work allowed — just reflection, rest, and presence.`,
    created_at: "2025-05-08T10:00:00Z",
    updated_at: "2025-05-08T10:45:00Z"
  },
  {
    id: "0ce56c90-8cb0-46f0-a4d1-65fd18220aa2",
    content: `Started tracking my workouts again. This week’s focus: consistency over intensity. Monday was upper body strength, Tuesday was mobility and light cardio. Today was legs — felt strong, but I need to stretch more after. Goal is 5 days this week, even if one is just a walk. Feeling better already just having structure and accountability.`,
    created_at: "2025-05-10T09:15:00Z",
    updated_at: "2025-05-10T09:40:00Z"
  },
  {
    id: "aad49c71-942c-4be0-a69a-ff292dc13ce2",
    content: `Reading “Deep Work” by Cal Newport again — I forgot how impactful this book is. The idea that focused, undistracted work is becoming rare and valuable hits harder than ever. I've been implementing 90-minute focus blocks with zero notifications, and the results are immediate: more output, less fatigue. Also started reading fiction at night instead of watching shows. Currently halfway through “Project Hail Mary” — amazing so far.`,
    created_at: "2025-05-12T18:00:00Z",
    updated_at: "2025-05-13T08:30:00Z"
  },
  {
    id: "f80c8d36-cf20-4194-90fa-3e9c56ae614e",
    content: `This morning I wrote down 5 things I’m grateful for: 1) My health, 2) A warm bed, 3) Coffee and quiet mornings, 4) Supportive friends, 5) The chance to learn something new today. Practicing gratitude consistently helps shift my mindset. Even on hard days, there’s always something to notice and appreciate.`,
    created_at: "2025-05-15T07:00:00Z",
    updated_at: "2025-05-15T07:20:00Z"
  },
  {
    id: "2d78a441-0eb8-4d34-bb2d-e6bd3a379dd3",
    content: `Idea dump: a minimalist habit-tracking app that only allows tracking 3 habits per day to prevent overwhelm. Another: a newsletter that curates weekly deep work playlists + articles about productivity psychology. Also thought of a YouTube channel reviewing productivity tools, but only with real-world use cases, not just features. Might pursue one of these for Q3.`,
    created_at: "2025-05-18T16:00:00Z",
    updated_at: "2025-05-18T17:10:00Z"
  },
  {
    id: "b8eb87b2-7fbd-403b-9c43-dc0efdc81b62",
    content: `Meal prep went well today. Made quinoa bowls with roasted veggies, chickpeas, and tahini sauce. Also baked some salmon and portioned it for lunch. Tried a new overnight oats recipe with chia seeds and almond butter — turned out great. Prepping ahead saves me so much stress during the week and keeps my eating habits more consistent.`,
    created_at: "2025-05-20T11:00:00Z",
    updated_at: "2025-05-20T11:25:00Z"
  },
  {
    id: "75f7b849-21c4-41ce-9b17-748b82656f5a",
    content: `Random thought: I often underestimate how much energy context switching takes. Today I tried batching all my shallow tasks (email, messages, errands) into one block and left the rest of the day for creative work. It felt like I bought back 3 hours. Also thinking about reducing screen time by 20% per week and replacing it with analog hobbies like sketching or journaling. Curious to see the ripple effects.`,
    created_at: "2025-05-22T23:00:00Z",
    updated_at: "2025-05-23T00:00:00Z"
  }
]
