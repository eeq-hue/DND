// ═══════════════════════════════════════════════════════════════════════════
// JOURNAL PAGE DATA
// ═══════════════════════════════════════════════════════════════════════════
//
// HOW THIS WORKS:
// Each "spread" below = one two-page view (left page + right page).
// Write your journal text as plain sentences in the "left" and "right"
// arrays - each item in the array becomes its own paragraph automatically.
//
// You do NOT need to write <p> tags or any HTML - just plain text.
// The renderJournalSpread() function (in marcy_journal.js) turns these
// arrays into paragraphs on the page for you.
//
// TO ADD A NEW SPREAD:
// 1. Copy one of the {...} blocks below (including the commas)
// 2. Paste it into the JournalPages array where you want it to appear
// 3. Replace the date/left/right text with your new entry
//
// TO ADD A NEW "CHAPTER" (e.g. Case 002 entries):
// Just keep adding spreads to the same array below, in the order you
// want them to appear. Use the section comment dividers (the lines of
// === signs) to visually separate chapters so they're easy to find with
// Ctrl+F - search for "CASE 002" etc.
//
// ═══════════════════════════════════════════════════════════════════════════


window.JournalPages = [

  // ═══════════════════════════════════════════════════════════════════════
  // SPREAD 0 — Index page (auto-generated from chapterLabel fields below)
  // ═══════════════════════════════════════════════════════════════════════
  { isIndex: true },

  // ═══════════════════════════════════════════════════════════════════════
// CHAPTER: ARRIVAL — Eyre 10th, 1010 YK
// ═══════════════════════════════════════════════════════════════════════

// --- Spread 1 ---------------------------------------------------------
{
  chapterLabel: "i · Arrival",
  chapterDate: "Throneport — Eyre 10th, 1010 YK",
  left: [
    "The city arrives before the dock does. You smell it first, salt and coal and something underneath both of those that might be ambition or might just be fish, honestly hard to say. Then the sound, which isn't loud so much as layered, everyone having a different conversation at the same time and none of them finished. By the time the boat found its berth I'd been standing at the rail for twenty minutes with my coat buttoned wrong and my bags at my feet and I'd already decided I liked it here. Good instincts or a personality flaw. I haven't fully examined which.",

    "Bai and Garrick were on the dock.",

    "I knew them immediately, which I think says more about them than it does about me. Bai looks like a man who has survived several things that should have been fatal and found the experience instructive. Very good coat. Eyes doing more work than the rest of his face is advertising. He called me Miss Maple before I had both feet on solid ground and I corrected him, with more composure than I had any right to,",
  ],
  right: [
    "given that I'd just dropped a biscuit directly onto the dock between us. One of the approximately one hundred thousand my grandmother had pressed into my bag at the last possible second. I left it there. There was nothing else to do. He took the correction with complete good humor, which I appreciated, and which also told me something about him. Garrick said nothing. He looked at me the way you look at something you were expecting and are relieved to find is actually there. I grew up around warforged from the war and thought I'd recalibrated my sense of scale. I hadn't. But there's a softness in him that the size doesn't announce, and I noticed it, and filed it away.",

    "The agency is one room. With Garrick in it, it's approximately half a room. Everything's stacked in a way that might be chaos or might be a system so personal it's become indistinguishable from chaos, I haven't determined which yet. Bai knew where everything was. I'm treating this as a good sign. I think.",
  ],
},

// --- Spread 2 ---------------------------------------------------------
{
  left: [
    "My desk has a lid that lifts up to store things inside. It is a school desk. I'm aware that I'm seventeen and this fact is going to keep presenting itself to me in small ways, and I'm making my peace with it. Grandfather would find this funny. I'm finding it funny. The distinction matters less than I thought it would.",

    "We had a case by the afternoon. I haven't unpacked. Writing this from the Gold Dragon Inn where we met the clients — the Le'Murs, spelling unconfirmed and now unconfirmable — and in about six hours I've gotten off a boat, lost a biscuit to the Throneport docks, been assigned a school desk, and solved something.",

    "This is exactly what I came here for.",

    "<span class='sig-mark'>-M.</span>",

    "P.S. Also, small thing, except not. Garrick wanted me to just leave the drugs where I found them. In the alley! On the ground! Where anyone could pick them up. Where a kid could pick them up or WORSE an animal could find them!!",
  ],
  right: [
    "I genuinely don't understand the logic here. We go to allll this trouble, we find the stash, we trace the dealer, we get the teens somewhere safe, and the plan is to just leave the actual drugs sitting there for the next person who walks by???? What's the logic here?",

    "I said no, obviously. I bagged them, I labeled them. I am the evidence-holder, that's a defined role now!! I made it one! If Garrick has a better system for what happens to a pile of unmarked pills and vials besides ignoring it and walking away I am genuinely willing to hear it. Until then they're staying with me, locked up, accounted for, not sitting in an alley waiting for someone to score or hit or whatever drug term it would be.",

    "Sure, maybe he had a reason. Maybe it's a leave-no-trace type of thing but I feel like that only applies to nature? Maybe it's a don't-touch-the-evidence thing, I have no idea, What do I know? I'm new, I'm inexperienced. But I couldn't make myself walk away and leave them there. Some things you don't get to be neutral about. The law is the law is the law!",
  ],
},

 // ═══════════════════════════════════════════════════════════════════════
// CHAPTER: CASE 002 — The Purple House
// ═══════════════════════════════════════════════════════════════════════

// --- Spread 1 ---------------------------------------------------------
{
  chapterLabel: "ii · Case 002 — The Purple House", 
  chapterDate: "Eyre 11th, 1010 YK",
  left: [
    "I missed the drug house bust. Ughhhhhh",
    "The whole team went in and I was off chasing deed records, which sort of exciting for me. The names on the purple house deed went nowhere. They're retired government officials, all of them gone in the way where you start to wonder if they were ever there at all. There are no records, no forwarding addresses, nothing. People don't misplace themselves that thoroughly by accident.",

    "Felix is the one that actually mattered, in the end (man who owns drug house). He worked at the embassy, lived right next door, and the signatures on his sale papers don't match a single name in the Aundair registry. Interesting! Someone was watching him, specifically. I don't know why. Out of every quiet man in Throneport, I don't know why him.",

    "Anywho, I found the others underground, eventually. Found Felix too, sealed in a bubble. Flowers in his hand, fresh as anything"
  ],
  right: [
    "(he was not fresh as anything tho). Scratched into the floor next to him: 'they took my name.' That phrase has been circling my head since I saw it. I can't place it. I don't think I've read it before. I don't know.",

    "There was a child in the basement. Twelve, yellow coat, toy magnifying glass. She had followed me into a crime scene completely unbothered. I talked her into keeping watch outside — told her it was a real job. She bought it. Her name is Pipi. I respect her commitment and fashion sense.",

    "Also, there was, I cannot believe I almost forgot to mention this, an orb situation. It's a small spooky sphere, very dark, just sitting in one of the rooms. Bai wanted to take something before he looked into it, some kind of chemical precaution from the drugs I'm holding as evidence. I said absolutely not. He looked anyway. Immediately, his whole face changed. He was suddenly, specifically scared of Latch a warforged caretaking this weird underground bunker. Suddenly Bai needed to put distance between Latch and us, right then.",

 ],
},

// --- Spread 2 ---------------------------------------------------------
{
  left: [
    "Bai wild eyed went for the key and turned it haphazardly. It didn't lock Latch away or it did, Latch ended up in a chamber, but I was standing too close to the chair in the center of the room. The one Felix was in (still dead by the way). I was watching Bai turn the key, same as everyone else, and the second he turned it the bubble shield went up around both of us.",

    "Me and the corpse, sealed in together. Amazing.",

    "But then we weren't underground anymore.", 

    "We were in a forest, suddenly. Full of butterflies. No in-between, no transition. One second a basement, next second trees. I had been in a bubble with a dead man maybe thirty seconds prior to that, so the travel method was not my biggest concern, but still. Filed away to ask about later.",

    "There was a tea party. There was a dwarf flirting with me, I think. I was collecting mushrooms and flowers at the time so I can't commit to that with full certainty.",
  ],
  right: [  
    "At one point there was a game involving oversized tadpoles and we were playing for some kind of prize except we had to leave before I found out what it was. I'm desperate to know what the prizes were!",
    
    "Bai has not stopped talking about the butterflies since we got back. He keeps saying it's exactly what he's been trying to explain, he wants more whimsy in his life, as if we didn't all just watch him get terrified by a dark orb and lock his own employee in a bubble. I don't know what to do with that. I'm filing it away with all the other things I don't know what to do with, which is most of them, currently.",

    "Back topside, Pipi says we were gone for a second. It felt like a whole afternoon to me. Something to do with the time difference between planes, probably. Keeping that to myself unless someone who actually went to school for this asks.",

     "We did find a real archive room when we got back though in the bunker thing. I haven't been through it properly yet. But I'm noting it down so I don't forget to look into it!",
  ],  
},

// --- Spread 3 ---------------------------------------------------------
{
  left: [
    "Also side note, there was a flash at some point too, this burst of energy, bright and sudden. After we got back, before anyone had really finished processing. I think it's tied to the orb somehow. Can't pin down the exact sequence yet. That's the most honest version I've got right now.",

    "I stayed with Pipi after the others went to handle the aftermath. Partly to thank her for actually keeping watch, partly because I wanted to know who lets a child go into something like that alone.",

    "Turns out nobody does. She just goes.", 

    "Told me her dad's been missing for eight months. No record of his ship leaving, no record of him coming back, just — gone. She said it like a fact. Like she was handing me a file, not her whole family. I don't think I've ever related to a twelve-year-old so hard in my life.",
  
    "So that's a whole new thing now.",
  ],
  right: [
   "Latch came up with us to the surface after. He didn't have anywhere else to be or purpose to keep the bunker safe since Felix is dead. He's looking after Pipi now, unofficially. Neither of them had people, before this. It's the one unambiguously good thing that's happened in the last twenty-four hours.",
        
    "Well. One of two. The other one's a case of its own. I'll get to that later.",
    "<span class='sig-mark'>-M.</span>",
    
    "P.S. Talking to Garrick after we got back and he says he saw Bai turn the key to 270 degrees. I would've said 90. Xander said 360, which is an entirely different problem. Bai's number didn't match any of ours.",

    "Latch told us not to go past 180. So I'm not sure what to do with that info, but write it down as to not forget. It's probably nothing.",
  ],
},

  // ═══════════════════════════════════════════════════════════════════════
// CHAPTER: CASE 003 — The Langstrom Disappearance 
// ═══════════════════════════════════════════════════════════════════════

// --- Spread 1 ---------------------------------------------------------
{
  chapterLabel: "iii · Case 003 — The Langstrom Disappearance",
  chapterDate: "Eyre 12th, 1010 YK", 
  left: [
    "Okay so Miss Pipi, the girl who followed me to the bunker and then kept watch for us.",

    "We got to talking, after everything settled. Properly talking, I mean. And she told me that her dad's missing. He's been gone for eight months! No record of his ship leaving, no record of him coming back. Just not here anymore. Also and maybe more importantly she says he's a pirate.",

    "Bai and Garrick said we couldn't not take the case. Bai insisted we file a proper Missing Persons Report, on the grounds that it would hold up better if we ever needed to present it. He'd know. Maybe he used to be on the other side of that paperwork? Garrick was invested immediately. Didn't even hesitate.",

    "The report's thin. Eight months, no sightings, no clues. We have a description of a scar over his eyebrow that Pipi drew for me because she didn't trust me to remember it right. I added it to the file.",
  ],
  right: [
    "I made it a point of being there for her birthday which was conveniently soon after our meeting. I figured she could use at least one person who showed up on purpose.",

    "She said she had an errand to run and we went down to the docks to House Orien Courier and package Office. She knew the gentleman working there and he knew her. After some pleasantries he gave her a small package filled with coins. Okay weird. But even weirder, the coins don't seem to have any national markings on them. Curious!",

    "The gentleman Mr. D'Orien said that this package is a standing order. Comes in every year, same time, like clockwork on her birthday. Paid up in full. By who? No idea.",

    " Anyway after that detour, I took her shopping. Mostly because I needed it too. She wanted a fake moustache detective kit. Perfection. It's an investment in her future. Then she asked me about invisible ink so maybe we could write secret notes to each other. I told her lemon juice works in a pinch if you can't find actual invisible ink. Which sadly,",
  ],
},

// --- Spread 2 ---------------------------------------------------------
{  
  left: [
    "we could not. We did find a lot of lemons though.",
    "The agency went down to the docks and it was a whole thing.",

    "Bai figured it made sense to start there. Ships coming in, ships going out, you know how docks work. If her dad left by sea then someone down there knows something.",
    "Except nobody down there is saying much of anything. Except Bai, who said 'labor organisers' with the kind of air-quotes that told me everything I needed to know.",
    "I said, 'what, like a union?'", 
    "And he said, 'no, like the mob.'",
    "Oop-",
    "We keep asking anyway. Nobody keeps answering. If Langstrom was with them, if he owed them money, if he just had the bad luck to be in their orbit, it's all the same non-response.",
  ],
  right: [
    "Anyway! Don't know yet if he went out to sea on purpose or if something pulled him out. Don't know if Pipi gets an answer she likes or just another question mark.",
    "But Latch walks her to the docks now. Cute! He doesn't say much but he doesn't need to.",
    "Garrick's been working old contacts. He's being quiet about it. Bai keeps finding reasons to bring Pipi's case up at the office. I think he just likes talking about her",
    "And then she's got me. Poking around. Later than I'd like, but still.",
      "<span class='sig-mark'>-M.</span>",
  ],
},

// ═══════════════════════════════════════════════════════════════════════
// CHAPTER: CASE 004 — The Galifar Hostage Situation
// ═══════════════════════════════════════════════════════════════════════

// --- Spread 1 ---------------------------------------------------------
{
  chapterLabel: "iv · Case 004 — The Galifar Hostage Situation",
  chapterDate: "Eyre 15th, 1010 YK",
  left: [
    "Garrick went to check on the boys from the drug house, the ones we brought in a few days ago. They're at the Galifar Restorative Institute now, which is a fancy name for a place that's half rehab, half asylum. Caters to the wealthy types who need somewhere discreet to send their troubled kids.",

    "Except there was trouble at the institute itself. Garrick called us in, me, Bai, Xander and said he needed backup. The place was in chaos! Patients rioting, orderlies incapacitated, the director missing. There's this weird radiant light coming from inside too. From what I can tell, it's not dangerous but it's also, not not dangerous. It feels icky to be around.",
    
    "There's press outside when we arrive. Bai sweet-talks the reporter, Christa Mayne, chronicles the crime beat, while the rest of us head in. She's been here since yesterday, says the patients turned on the staff after some kind of energy wave (I wonder who could know about that?). The Director's missing and the guards are stretched thin.",
  ],
  right: [
    "We get up to the roof for a better vantage and because there is no other way inside. This is also easier said than done. Garrick and Bai get tangled up trying to boost each other, their picture being taken in the process via the reporter. Amazing. Somehow they manage to get up there, and Xander goes ahead, scoping the courtyard.",

    "There's one patient just wandering, mumbling to himself. Bai tries to talk to him and it goes about as well as you would think. Then Bai finds a crazed woman who charges him.",

    "What do you think happens next? A grown man easily subduing a crazed woman in a hospital gown? Well you'd be wrong. Bai has a crowbar, for some godsent reason. He tries to knock her out with it. Misses entirely which of course pisses her off. Then Xander has a go with his club, thinking THIS surely will knock her out if a crowbar, a steel crowbar cannot. However he only succeeds in tapping her on the nose, which accomplishes pretty much nothing except making her even more mad.",
  ],
},

// --- Spread 2 ---------------------------------------------------------
{
  left: [
    "My bright idea in this swarm of chaos is to splash water on her, maybe jolt her back to reality. But that also doesn't work and just gets everyone wet.",

    "We finally subdue her and by we I mean Garrick. Finally inside we find that the orderlies are all unconscious, not incapacitated. Either from the energy blast or from the crazed patients beating them there.",

    "We creep around and find what? Another archive room which again we don't get to check out. But we do end up finding the Director. Tied down. Poked and slashed with needles by an extra spicy patient. The gang goes in guns blazing, I go in and start a rumor. I tell the patient that someone else told us he's not even that blood thirsty, he's just all talk. Enraged the man goes to find the nay sayer!", 
    
    "Finally safe-ish. The Director says the warning system failed. High-risk patients got out and turned everyone else loose. One of our drug house boys — Jeff I think — leads us to the pharmacy, and helps distribute meds to the non-violent patients. I slip him some candies as a thank-you.",
    
  ],
  right: [
   "NOTE: Cotton candies. They're called cotton candies.",

   "Garrick's handling the extra crazy patients. One that was already out and about and the other who was torturing the Director. Bai's trying to help of course, which is its own kind of hazard.",

    "He has this Karrnathi war rifle — illegal, VERY much illegal — and he's waving it around like it's a parade baton. Trying to look threatening, I think maybe hope",

    "And then he fires it.",

    "Aiming for one of the patients, but his aim is, well. It's Bai.",
    "Anywho! He hits Garrick square in the chest.",

    "That should've vaporized him on the spot. Would have, if he wasn't — you know. Him. Celestial constitution is the only thing that kept him standing. Hurt like hell, though. You could see that much on his face, even if he wasn't saying it.",
  ],
}, 
    // --- Spread 3 ---------------------------------------------------------
{
  left: [

   "The patients are both now sedated, but fine. Bai is mortified, but fine. Garrick is very much not fine, but walking, which is a kind of fine I guess.",

  "The Director's stable, at least now too. The patients are all tucked back into their rooms. Jeff seems happier than I would think given that he's still here. He seems sort of out of it. I don't know.",

  " We're heading back to the office. I need to write this up properly, of course. Maybe, need to have a word with Bai and then maybe need to sleep for about a week, honestly, but I'll settle for a few hours.",
    "<span class='sig-mark'>-M.</span>",
    "P.S. Those candies I gave Jeff? Not candies. Cotton, sure. Not candy. I'm a detective, I detect. Detect drugs and distribute, apparently!!!",
    "Though now, it does make sense why the Director looked pissed at me when I gave Jeff that bag.",
    "Sigh - I can only do so much. It's like what, my third day here? I'm only 17, who thought it was a",
   ],
  right: [
    "good idea to let ME hold the illicit drugs??",
    "Whatever.",
  ],
},

];