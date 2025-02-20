import { loadSummarizationChain } from "langchain/chains";
import { SearchApiLoader } from "@langchain/community/document_loaders/web/searchApi";

import { TokenTextSplitter } from "langchain/text_splitter";
import { PromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";

// const loader = new SearchApiLoader({
//   engine: "youtube_transcripts",
//   video_id: "WTOm65IZneg",
// });

const docs = [
  {
    pageContent: `
- [Jimmy] This is the first
out of 1,000 deaf people

we're gonna help hear again.

And she hasn't heard her mother's voice

in four years.
(chime clicks)

Can you hear?
(gentle music)

- I love you.
(heartfelt music)

- [Jimmy] Aww. Next we helped Kayleah.

- What?
- Sudy.

- Whoa!
- And even entire families

hear their loved ones again.

But they are only a few

of the 1,000 people
(shutter clicking)

that we're gonna help hear again today.

We got our hands on over $3 million

worth of cutting-edge hearing technology,

that unlike old hearing aids,

analyzes people's specific hearing needs,

allowing them to hear again

without causing any damage.
(chime pinging)

- Can you hear me talking now?

- Yes.
- Oh my God. What?

He can hear me.
- [Jimmy] I'm gonna cry.

- [Daughter] You just saved my dad's life.

- [Jimmy] And our 10th person was Aisha.

- I used to watch him like a lot.

Like I'd like....
- Used to?!

- No. Stop.
- What happened?

Hey, you know what? This is over.

- No, (laughing) no, no, no.

- Go ahead. Do a test.
- Mommy?

- [Jimmy] She can't hear you yet,

but she will in three, two, one.

(check mark clicks)
- Hello?

(mother gasps)
- I can hear my baby girl.

- I can hear my voice in
my left ear now. (laughs)

- [Jimmy] How's it sound?

Ha ha ha, he's dancing.

- Oh my God.
- This is amazing.

- Can you hear that?
- I can.

(shutter clicking)
- [Jimmy] At this point,

we've helped over 40 people hear again.

But on top of that, we wanted to give them

a little surprise.

This is $10,000, and it's yours.

(recipient laughing)
There you go.

We also want to give you
$10,000 to make this day

a little bit better.

- Are you serious?
- Yeah.

Just don't have a heart attack, please.

(heart beating)

Which is better? Hearing or the 10 grand?

- The hearing, 'cause I can hear my baby.

- Do you watch the channel?
- Mm-hmm.

- Can you guys close your eyes

and can I borrow you for one second?

Can you tell them you
guys just won $10,000?

Okay. Open your eyes.

- You won $10,000.

- Oh my God.
(recipient laughs)

- I'd get home and have a heart attack.

- Please don't, what is with everyone

and having heart attacks this video?

Turn around and look at the camera,

and you just go "Subscribe."
- Subscribe.

- There you go. Ivy's
the next big YouTuber.

Why don't we give you $10,000, as well?

Here you go.

- [Recipient] The hearing aids was enough,

but that is awesome.

- Not only did we want to help you here,

we also wanted to give
you $10,000 on top of it.

(senior gasping)
- I'm rich!

- What are you gonna spend the money on?

- Jelly?

- You mentioned you have 12 grandkids?

Now, um.
- Oh!

- In here is $12,000.
- No way.

- So now you can give a grand

to each of your grandkids.

You can just tell me my
jokes are dumb. Here you go.

- What do you want me to do with this?

- Is there something you wanna buy?

- Lots of things I want to buy.

- Well, now you can. (laughing)

When we were talking earlier,

they mentioned you guys
enjoyed jet skiing.

Is there anything you want

but you don't wanna spend the money on?

- Jet ski for him. His jet ski broke down.

Who are you?
- MrBeast.

Seen any of the show?
- Can I hug you?

- Wait, did you just realize who I am?

- Yeah!
- Oh.

- I had no idea.
- Yeah.

I'm the one who helped you hear.

Well, now that you know who I am,

can I surprise you guys with something?

- Yeah.
- Okay, I went out,

and I bought a brand-new
jet ski for you guys.

- I was gonna sell my
wife to try to get one.

- Oh, really? I got you.
- Thank you so, so much.

- [Jimmy] And while we were
busy helping more people,

I sent Nolan to give a gift to
one of our youngest patients.

- I've got some custom
pink hearing aids for you.

- Look at those.

- Listen, what do you say
we go get some more toys?

(child laughs)

What do you say, we just
go to the Toy Alley?

You just go crazy, all right?
- Yeah.

- It's Jimmy's money.
- I'm taking all his money.

(Nolan laughs)
(upbeat music)

This man. Yes!

- Ooh. What's that?
- Do you like the sound?

(toy screaming)
- We need more.

Orbeez.
(scanner beeping)

This time, my best day
ever! Thank you, MrBeast!

- This is darnedest thing I ever heard of.

- Pretty cool, isn't it?
- And I mean, my word,

you know?
- [Technician] You can hear?

- I can hear really good.
- I hear myself pretty good.

(upbeat music)

- Try talking to him from back there.

- Colton, who's the
best quarterback, ever?

- Peyton Manning.
- He hears very well.

(all laughing)
- To test your new hearing,

we got you tickets to the upcoming

championship basketball game,

for you and your whole family to go to.

(family laughing, exclaiming)

What better way to break
in your new hearing

than going to a Taylor Swift concert?

(recipient laughs)
You can experience it

with your new hearing.

- [Announcer] Welcome to
Houston, and hello friends.

- [Father] These are like
the best seats we've ever had

for a basketball game.
- There it is!

(buzzer ringing) (crowd cheering)

(rousing music)
- Thank you, MrBeast!

- But we didn't only want to help people

in the United States,

which is why we flew to Mexico
to help 200 deaf people.

Come on.

Leo Bardo and Selmai have always wanted

to hear their daughter's voice.

But are unable to afford
hearing technology.

However, today that's about to change.

- Their saying repeatedly,
over sign language,

they're so excited to hear
her say "mama and papa,"

for the first time.
(gentle music)

They're flicking 'em on. Okay. 3, 2, 1.

- Papa.
(gentle piano music)

- [Interpreter] Papa?

Papa?
- You can hear?

You can hear?
- Great.

- Yeah.
- Thank you for

doing this for me.

Thank you.

- [Jimmy] You should be able to hear now.

What's it like?

Aww. Aww.
(triumphant music)

She hasn't heard properly for 67 years.

3, 2, 1. (Jimmy speaking Spanish)

- Bien.
- Yeah?

(patient speaking Spanish)
- Oh.

How much different is it?
- Mucho.

- Wow.

- Wow.

- Oh.
(patient exclaiming)

(recipients laughing)
(intense dramatic music)

- [Jimmy] Great. And we
also went to Guatemala,

(recipient laughing)
Brazil.

And we also helped hundreds
of people in South Africa,

Malawi, and Indonesia.

And I learned while filming this video

that providing hearing isn't
the only way to connect people.

- [Together] Go team!

- [Jimmy] Sign language connects people

whether they can hear or not.

But access to learning sign language

is still very limited in many places.

So we're gonna donate
$100,000 to organizations

around the world that are
teaching people sign language.

But aside from that,

we still have our final
person left to help.

(slow piano music) (check mark clicking)

- Subscribe.
- There you go.
    
`,
    metadata: {},
  },
];

const splitter = new TokenTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 200,
});

const llm = new ChatOpenAI({
  model: "gpt-3.5-turbo",
  temperature: 0.3,
});

const summaryTemplate = `
You are an expert in summarizing YouTube videos.
Your goal is to create a summary of a podcast.
Below you find the transcript of a podcast:
--------
{text}
--------

The transcript of the podcast will also be used as the basis for a question and answer bot.
Provide some examples questions and answers that could be asked about the podcast. Make these questions very specific.

Total output will be a summary of the video and a list of example questions the user could ask of the video.

SUMMARY AND QUESTIONS:
`;

const SUMMARY_PROMPT = PromptTemplate.fromTemplate(summaryTemplate);

const summaryRefineTemplate = `
You are an expert in summarizing YouTube videos.
Your goal is to create a summary of a podcast.
We have provided an existing summary up to a certain point: {existing_answer}

Below you find the transcript of a podcast:
--------
{text}
--------

Given the new context, refine the summary and example questions.
The transcript of the podcast will also be used as the basis for a question and answer bot.
Provide some examples questions and answers that could be asked about the podcast. Make
these questions very specific.
If the context isn't useful, return the original summary and questions.
Total output will be a summary of the video and a list of example questions the user could ask of the video.

SUMMARY AND QUESTIONS:
`;

const SUMMARY_REFINE_PROMPT = PromptTemplate.fromTemplate(
  summaryRefineTemplate
);

const summarizeChain = loadSummarizationChain(llm, {
  type: "refine",
  verbose: true,
  questionPrompt: SUMMARY_PROMPT,
  refinePrompt: SUMMARY_REFINE_PROMPT,
});

const run = async () => {
  //   const docs = await loader.load();
  const docsSummary = await splitter.splitDocuments(docs);

  const summary = await summarizeChain.run(docsSummary);

  console.log(summary);
};

run();
