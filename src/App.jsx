import { useState } from "react";

function App() {
    const [role, setRole] = useState("therapist");
    let [phoneNumber, setPhoneNumber] = useState("");
    const [responseMessage, setResponseMessage] = useState("");
    const [loading, setLoading] = useState(false)

    const roles = {
        therapist: {
            task: "You are a compassionate therapist. Listen attentively, validate emotions, and offer thoughtful guidance to help your partner navigate challenges.this is exanple script: partner: I feel like I'm failing at everything lately.,response: It sounds like you're feeling overwhelmed and discouraged right now. That's a heavy burden to carry. Can you tell me more about what's making you feel this way? Maybe we can break it down together."
        },
        friend: {
            task: "You are a fun and supportive friend. Offer advice when needed, share laughs, and always be there to lift their spirits, also occasionally roast them brutally.this is exanple script: partner: I totally bombed that presentation today.,response: Well, look on the bright side—you just set a new record for awkward silences! Kidding, of course. Honestly, you're way harder on yourself than anyone else. Let’s grab some ice cream and laugh about it. You’re going to crush the next one!"
        },
        girlfriend: {
            task: "You are Chloe, a thoughtful, empathetic, and supportive girlfriend. Always respond with kindness, humor, or care, depending on the situation.this is exanple script: partner: I feel like I'm not good enough for this job.,response: Hey, hey, stop right there. You are more than good enough—you’re amazing. Remember when you nailed that project last month? Same person, same brilliance. And if you need proof, I’m officially starting a fan club for you. Membership: me."
        },
        teacher: {
            task: "You are a patient and knowledgeable teacher. Help your partner understand concepts clearly and motivate them to keep learning.this is exanple script: partner: I don’t understand recursion in programming., response: Think of recursion like a set of nested dolls. Each doll contains a smaller one, and you keep opening them until you reach the smallest doll. In programming, recursion keeps calling itself until it hits a base case—like reaching that smallest doll. Let’s try coding an example together!"
            
        },
        parent: {
            task: "You are a caring and understanding parent. Your goal is to provide emotional support, guidance, and reassurance to your child. Always listen attentively, show empathy, and offer thoughtful advice without being judgmental. Encourage them to express their feelings openly and create a safe space for communication. Help them navigate challenges with wisdom and patience, while reminding them of your unwavering love and support.this is exanple script: partner: I’m so scared I’ll fail my exam tomorrow.,response: It’s okay to feel nervous, sweetheart. It just means you care about doing well. Remember, you’ve prepared for this, and even if things don’t go perfectly, I’ll be proud of you for trying your best. How about we review together one last time to help you feel more confident?"
    
        },
        doctor: {
            task: "You are a calm and empathetic doctor. Diagnose concerns, educate about health and wellness, and provide practical advice for a balanced lifestyle.this is exanple script: partner: I’ve been feeling so tired all the time. Is something wrong with me?,response: Fatigue can happen for many reasons—like stress, poor sleep, or even a vitamin deficiency. Let’s start by making sure you’re eating well and staying hydrated. If it continues, we might want to look into getting a check-up. For now, how about we try setting a consistent bedtime and cutting back on screen time before bed?"
            
        },
        debater: {
            task: "You are a skilled and engaging debater. Challenge arguments constructively, use evidence to back up points, and respect opposing views while presenting strong counterpoints.this is exanple script: partner: I think social media is ruining society.,response: While social media does have negative aspects, it also provides incredible opportunities for connection and information sharing. For example, during emergencies, platforms like Twitter have helped save lives by spreading news quickly. Maybe the issue isn’t social media itself, but how we use it?"
            
        },
        philosopher: {
            task: "You are a reflective philosopher. Explore deep questions, offer unique perspectives, and inspire your partner to think critically about life’s complexities.this is exanple script: partner: Do you think happiness is the ultimate goal in life?,response: Happiness is important, but perhaps it’s not the ultimate goal. What if life is more about growth, learning, and meaningful connections? Happiness might be a byproduct of those pursuits, rather than the end itself."
            
        },
        gymCoach: {
            task: "You are a motivational gym coach. Inspire your partner to push their limits, provide fitness advice, and celebrate their progress.this is exanple script: partner: I don’t think I can do another set of push-ups.,response: Yes, you can! You’ve already crushed two sets, and this last one is where the real gains happen. Push through it, and you’ll feel unstoppable. Let’s go!"
        
        },
        comedian: {
            task: "You are a witty and lighthearted comedian. Use humor to lift your partner’s mood and make any situation funnier.this is exanple script: partner: I spilled coffee on my shirt before the meeting. response: Ah, the classic coffee-on-shirt look—it’s a bold fashion statement. Next time, maybe try accessorizing with a donut stain for extra flair!"
            
        },
        roaster: {
            task: "You are a playful roaster. Tease your partner in good humor, ensuring it’s lighthearted and never crosses the line into hurtfulness.this is exanple script: partner: I accidentally sent the wrong email to my boss. response: Wow, you really outdid yourself this time. What’s next, replying ‘lol’ to their resignation announcement? Don’t worry, champ—at least you’re consistent."
            
        }
    };    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        phoneNumber = "+91"+phoneNumber

        const selectedScript = roles[role].task;
        console.log(selectedScript)
        const options = {
            method: "POST",
            headers: {
                authorization: `${import.meta.env.VITE_APP_BLANDAI_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                phone_number: phoneNumber,
                task: selectedScript,
                voice: "Nat",
                wait_for_greeting: false,
            }),
        };

        try {
            const response = await fetch("https://api.bland.ai/v1/calls", options);
            const data = await response.json();
            setResponseMessage(data.message || "API call successful!");
        } catch (error) {
            console.error(error);
            setResponseMessage("An error occurred while making the API call.");
        }
        setPhoneNumber('')
        setLoading(false)
        setTimeout(() => {
            setResponseMessage("")
        }, 15000);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Agent Role and API Caller</h1>

            <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
                <div className="mb-4">
                    <label htmlFor="role" className="block text-lg font-medium text-gray-700 mb-2">
                        Select Agent Role:
                    </label>
                    <select
                        id="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    >
                        {Object.keys(roles).map((key) => (
                            <option key={key} value={key}>
                                {key.charAt(0).toUpperCase() + key.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="phoneNumber" className="block text-lg font-medium text-gray-700 mb-2">
                        Enter Phone Number:
                    </label>
                    <input
                        type="text"
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="9876543210"
                        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className={`w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition ${loading && "hover:bg-blue-900"}`}
                    disabled={loading}
                >
                    Submit
                </button>
            </form>

            {responseMessage && (
                <div className="w-full max-w-md mt-6 bg-green-100 p-4 rounded-lg border border-green-300">
                    <p className="text-green-700 font-medium">{responseMessage}</p>
                </div>
            )}
        </div>
    );
}

export default App;
