
import { DispositionCard } from './types';

const vowels = ['A', 'E', 'I', 'O', 'U'];

export const LADDER_CARDS: DispositionCard[] = [
  {
    id: 'A',
    letter: 'A',
    title: 'Achievement Attitude',
    isVowel: true,
    skilled: [
      'Takes full advantage of opportunities',
      'Begins with the end in mind and remains conscious of targets',
      'Knows the expectations and educational outcomes',
      'Maximizes instructional time and resources',
      'Works toward excellence in standards continuously',
      'Stays focused on the task at hand',
      'Maintains consistency in energy and attitude',
      'Holds people accountable without shame or blame'
    ],
    overused: [
      'Focuses solely on outcomes/test results at expense of relationships',
      'Strategizes to game the testing system',
      'Makes plans too complicated',
      'Leaves no room for mistakes',
      'Ignores the necessity of breaks'
    ],
    unskilled: [
      'Lacks focus on priorities/goals',
      'Is unaware of internal and external targets',
      'Expects minimal performance',
      'Unable to connect process to outcomes',
      'Approaches goals with a passive attitude',
      'Wastes instructional time'
    ]
  },
  {
    id: 'B',
    letter: 'B',
    title: 'Balance',
    isVowel: false,
    skilled: [
      'Focuses equally on personal and professional needs',
      'Derives satisfaction from both work and personal life',
      'Identifies one’s own values and operationalizes them',
      'Recognizes signs of stress and works to prevent burnout',
      'Actively maintains well-being'
    ],
    overused: [
      'Adheres rigidly to boundaries without flexibility',
      'Avoids or fears change',
      'Forces concept of "balance" onto others',
      'Attends to personal fulfillment to detriment of work quality',
      'Creates culture that praises overcommitment'
    ],
    unskilled: [
      'Neglects work or personal life at expense of other',
      'Internalizes guilt over time spent in one category',
      'Bounces back and forth without boundaries',
      'Allows work to dominate thoughts',
      'Focuses on one aspect to detriment of others'
    ]
  },
  {
    id: 'C',
    letter: 'C',
    title: 'Communication',
    isVowel: false,
    skilled: [
      'Gives and receives information effectively',
      'Delivers appropriate type and amount of information',
      'Ensures proper timing and frequency',
      'Conducts check-ins to see if people have what they need',
      'Adjusts communication style as appropriate',
      'Uses multiple platforms for communication'
    ],
    overused: [
      'Communicates excessively multiple times a day',
      'Overuses emails (spam) and social media',
      'Expects instantaneous email responses',
      'Offers minimal instruction and expects maximum results'
    ],
    unskilled: [
      'Articulates concepts without clarity',
      'Provides insufficient information/inappropriate timing',
      'Avoids uncomfortable or controversial topics',
      'Conveys incorrect or incomplete messages',
      'Relies on a single mode of communication'
    ]
  },
  {
    id: 'D',
    letter: 'D',
    title: 'Direction',
    isVowel: false,
    skilled: [
      'Sees vision and end goal with clarity',
      'Can move forward and adapt without getting lost in details',
      'Energizes others to buy into the vision',
      'Understands how change happens',
      'Paints a clear, shared picture of unique finish line',
      'Enlists others through subtle persuasion'
    ],
    overused: [
      'Emphasizes mission so passionately personnel get lost',
      'Hyper focuses on vision for future state, neglects current',
      'Redirects so pathways are in constant state of change',
      'Ignores historical precedent'
    ],
    unskilled: [
      'Loses the "forest for the trees"',
      'Unable to articulate goals in clear manner',
      'Leaves little room for others to find their place',
      'Withholds building capacities in others',
      'Unskilled at anticipating challenges',
      'Has tunnel vision for "here and now"'
    ]
  },
  {
    id: 'E',
    letter: 'E',
    title: 'Emotional Equilibrium',
    isVowel: true,
    skilled: [
      'Maintains one’s own response to stress management',
      'Utilizes emotions appropriately in decision making',
      'Acknowledges one’s part in emotional interactions',
      'Deescalates situations that are emotionally charged',
      'Handles high pressure with steady calmness',
      'Avoids ascribing intent to others’ actions',
      'Recognizes power struggles as futile'
    ],
    overused: [
      'Masks emotions; hides feelings at all costs',
      'Promotes false expectations that others should cope',
      'Is robotic in interactions'
    ],
    unskilled: [
      'Interprets interactions as personal attacks',
      'Exhibits volatile behavior when confronted',
      'Loses temper easily; emotional instability',
      'Lacks composure; crumbles when faced with stress',
      'Behaves in retaliatory or vengeful way',
      'Hosts a chaotic environment',
      'Is irrational and unpredictable'
    ]
  },
  {
    id: 'F',
    letter: 'F',
    title: 'Fairness',
    isVowel: false,
    skilled: [
      'Maintains an equity approach',
      'Applies same standards to all learners',
      'Actively works to include all learners',
      'Provides consistent feedback and consequences',
      'Sets reasonable and realistic expectations',
      'Puts forth fair, objective, unbiased viewpoints',
      'Recognizes power differential'
    ],
    overused: [
      'Offers excessive options and choices',
      'Focuses on distributing work evenly instead of equitably',
      'Wastes time trying to please everybody',
      'Ignores extenuating circumstances'
    ],
    unskilled: [
      'Displays favoritism',
      'Views own ideas as the only/right way',
      'Assigns consequences/workload unevenly',
      'Lacks accountability for all',
      'Expects the impossible'
    ]
  },
  {
    id: 'G',
    letter: 'G',
    title: 'Generosity',
    isVowel: false,
    skilled: [
      'Recognizes capacity of own resources',
      'Establishes effective boundaries',
      'Assumes positive intent on part of others',
      'Believes people are doing the best they can',
      'Uses innovative ways to obtain resources',
      'Takes appropriate interest in lives of others',
      'Maintain habitual practice of gratitude'
    ],
    overused: [
      'Overextends to point of personal harm',
      'Over distributes personal resources',
      'Acts as enabler by removing all barriers',
      'Does not hold learners accountable',
      'Regards over giving as the norm'
    ],
    unskilled: [
      'Does bare minimum required',
      'Holds cynical and skeptical view of others',
      'Assumes others don’t work as hard',
      'Accepts restrictions as status quo'
    ]
  },
  {
    id: 'H',
    letter: 'H',
    title: 'Hearing',
    isVowel: false,
    skilled: [
      'Reflects, paraphrases, and reframes comments',
      'Maintains openness and agreeable demeanor',
      'Eliminates distractions and maintains presence',
      'Probes for details and asks clarification',
      'Allows others to finish sentences',
      'Asks what action steps are needed',
      'Ensures others feel validated'
    ],
    overused: [
      'Interrupts others and finishes sentences',
      'Concurs with every statement signifying agreement',
      'Over-listens, may allow misconception of consent',
      'Insists on excessive detail',
      'Participates in destructive gossip'
    ],
    unskilled: [
      'Crafts responses before speaker is finished',
      'Multitasks during discussions',
      'Divides attention to phone/screen',
      'Rushes through conversations'
    ]
  },
  {
    id: 'I',
    letter: 'I',
    title: 'Inspirational Influence',
    isVowel: true,
    skilled: [
      'Adapts approaches to meet different motivations',
      'Creates task-oriented learning atmosphere',
      'Engages all learners to have ownership',
      'Encourages learners to do their personal best',
      'Enables learners to feel seen',
      'Recognizes effort and strengths',
      'Helps identify barriers to personal growth',
      'Believes in the potential of people'
    ],
    overused: [
      'Leaves some students behind while championing others',
      'Promotes unrealistic initiatives',
      'Motivates through shame, sarcasm, or embarrassment',
      'Praises insincerely',
      'Pressures learners to perform to brink of anxiety'
    ],
    unskilled: [
      'Responds negatively to success of others',
      'Utilizes top-down command structure',
      'Praises and provides opportunities inequitably',
      'Employs punishment or excessive negative reinforcement',
      'Relies on single motivational strategy'
    ]
  },
  {
    id: 'J',
    letter: 'J',
    title: 'Judgment',
    isVowel: false,
    skilled: [
      'Uses judgment based on best information available',
      'Able to make effective decisions without moving too quickly',
      'Investigates situations for appropriate amount of detail',
      'Avoids "analysis paralysis"',
      'Anticipates and considers outcomes',
      'Accepts and owns consequences',
      'Discerns when individual or group decision-making is effective'
    ],
    overused: [
      'Over-analyzes situations',
      'Exhibits frustration when advice not accepted',
      'Shares opinions on every situation regardless of effect',
      'Exhibits demeanor of infallibility'
    ],
    unskilled: [
      'Demonstrates apathy in making decisions',
      'Exhibits demeanor of indifference',
      'Makes impulsive choices',
      'Blames others for failures'
    ]
  },
  {
    id: 'K',
    letter: 'K',
    title: 'Knowledge',
    isVowel: false,
    skilled: [
      'Maintains awareness of current developments',
      'Confirms authenticity and credibility',
      'Recognizes evolution/application of data',
      'Teaches others to seek and vet factual content',
      'Ensures materials are relevant',
      'Utilizes wide variety of media'
    ],
    overused: [
      'Resists incorporation of tried-and-true strategies',
      'Reluctant to engage in fresh approach for fear of bias',
      'Implores implementation of multiple initiatives',
      'Jumps on every bandwagon'
    ],
    unskilled: [
      'Employs out-of-date instructional practices',
      'Uses older textbooks for familiarity',
      'Depends on knowledge gathered by others',
      'Over-relies on historical status quo',
      'Practices hearsay'
    ]
  },
  {
    id: 'L',
    letter: 'L',
    title: 'Learning',
    isVowel: false,
    skilled: [
      'Identifies and actively pursues opportunities',
      'Continues to develop craft of teaching',
      'Acknowledges and applies lessons from mistakes',
      'Actively seeks and gives useful feedback',
      'Disarms defensiveness in feedback sessions',
      'Inspires growth mindset',
      'Provides stretch assignments',
      'Identifies and removes obstacles to development'
    ],
    overused: [
      'Over-apologizes for personal shortcomings',
      'Difficulty acknowledging mistakes',
      'Pushes growth areas onto others without buy-in',
      'Places ambition above organizational health'
    ],
    unskilled: [
      'Struggles to self-assess and reflect',
      'Is uninterested in professional development',
      'Disregards/ignores constructive criticism',
      'Withholds opportunities for growth'
    ]
  },
  {
    id: 'M',
    letter: 'M',
    title: 'Mediation',
    isVowel: false,
    skilled: [
      'Does not shy away from conflict',
      'Addresses conflict in a timely manner',
      'Recognizes conflict as an opportunity for growth',
      'Willing to put problem in front of us (citation: Brene Brown)',
      'Collaborates for solutions',
      'Does not allow anger or emotion to cloud judgment',
      'Builds camaraderie despite individual views'
    ],
    overused: [
      'Wastes time trying to resolve conflict with stubborn people',
      'Drives for solutions before others are ready',
      'Attempts to solve every problem regardless of role',
      'Seeks harmony in every situation'
    ],
    unskilled: [
      'Avoids conflict at all costs',
      'Approaches conflict with closed mind',
      'Engages in arguments when unnecessary',
      'Displays self-righteousness'
    ]
  },
  {
    id: 'N',
    letter: 'N',
    title: 'Navigating',
    isVowel: false,
    skilled: [
      'Seeks and maximizes creative use of alternative resources',
      'Understands complicated situations and finds way through',
      'Anticipates political hotspots',
      'Maintains appropriate levels of transparency',
      'Predicts future trends',
      'Recognizes when to keep advocating or stop',
      'Utilizes ethical compass',
      'Strategically negotiates favor',
      'Knows where to go to get job done'
    ],
    overused: [
      'Allocates excessive resources to make decisions',
      'Allows for others to rely on oneself without empowering',
      'Misinterprets boundaries and command chain',
      'Manufactures political drama'
    ],
    unskilled: [
      'Initiates task without clear picture',
      'Avoids innovative problem-solving',
      'Puts professional alliances above learners',
      'Quits or gives up when things get challenging'
    ]
  },
  {
    id: 'O',
    letter: 'O',
    title: 'Open Orientation',
    isVowel: true,
    skilled: [
      'Reflects on and understands oneself',
      'Maintains warm and welcoming approach',
      'Builds rapport with others',
      'Maintains awareness of one’s privilege',
      'Utilizes situational awareness',
      'Recognizes and adjusts one’s biases',
      'Open to giving and receiving feedback',
      'Accepts others have different viewpoints',
      'Adapts to situations as they change',
      'Embraces differences in values across generations'
    ],
    overused: [
      'Appears insincere in interactions',
      'Lacks authenticity',
      'Accepts and validates everyone all the time',
      'Assumes role of social justice warrior overcorrecting'
    ],
    unskilled: [
      'Shrugs off others’ viewpoints',
      'Overlooks one’s own unconscious biases',
      'Ignores non-verbal communication cues',
      'Shows preferential treatment for "like me"',
      'Makes character assumptions',
      'Projects negative expectations'
    ]
  },
  {
    id: 'P',
    letter: 'P',
    title: 'Prioritizing',
    isVowel: false,
    skilled: [
      'Identifies and manages deadlines',
      'Utilizes planning periods effectively',
      'Knows what doesn’t need to be accomplished',
      'Maintains balance of energy',
      'Delegates to those who they can empower',
      'Recognizes time wasters',
      'Eliminates unnecessary tasks',
      'Recognizes issues around perfectionism',
      'Sets realistic expectations'
    ],
    overused: [
      'Takes on too many tasks; overcommits',
      'Spends too much time planning, not enough doing',
      'Displays compulsiveness in behavior',
      'Views every initiative as an emergency'
    ],
    unskilled: [
      'Wastes planning time; "failure to launch"',
      'Focuses on too many goals with none done well',
      'Exhibits poor organizational skills',
      'Gives all initiatives equal importance'
    ]
  },
  {
    id: 'Q',
    letter: 'Q',
    title: 'Quality',
    isVowel: false,
    skilled: [
      'Sets and maintains standards of excellence',
      'Accepts responsibility when standards are not met',
      'Encourages others to utilize failure as opportunity',
      'Utilizes multiple intelligences',
      'Takes personal pride in experience',
      'Ensures service excellence'
    ],
    overused: [
      'Does not accept failure from others',
      'Refuses to fail; perfectionist',
      'Ignores external variables and barriers',
      'Pursues achievement at expense of wellness'
    ],
    unskilled: [
      'Accepts mediocrity',
      'Blames learners for lack of performance',
      'Believes current level is "good enough"',
      'Regards excellence as unattainable'
    ]
  },
  {
    id: 'R',
    letter: 'R',
    title: 'Relationships',
    isVowel: false,
    skilled: [
      'Is intentionally approachable',
      'Views peer relationships as cooperation',
      'Views and embraces "small talk" as investment',
      'Anticipates others’ comfort with connection',
      'Manages social and non-verbal cues',
      'Works effectively with many personality types',
      'Puts collective vision above individual differences',
      'Strikes balance between professional and personal invested'
    ],
    overused: [
      'Behaves to keep people happy no matter what',
      'Expects parents to parent same way "you" parent',
      'Attempts to develop deep connections with everyone',
      'Wastes excessive amounts of time socializing',
      'Disregards healthy boundaries'
    ],
    unskilled: [
      'Projects an image of unapproachable',
      'Displays poor socio-emotional skills',
      'Promotes a "loner" reputation',
      'Misunderstands and misinterprets social cues',
      'Denies forgiveness to others'
    ]
  },
  {
    id: 'S',
    letter: 'S',
    title: 'Stamina',
    isVowel: false,
    skilled: [
      'Overcomes obstacles consistently',
      'Persists and finishes tasks despite setbacks',
      'Selects and assigns only mission-driven tasks',
      'Recognizes and anticipates capacity',
      'Shares experiences to help others recognize hope',
      'Manages balance of productivity and breaks',
      'Handles ambiguity and makes progress'
    ],
    overused: [
      'Makes every situation about "Me"',
      'Pushes oneself and others at detriment to wellness',
      'Stays the course despite overwhelming evidence',
      'Continues without buy-in'
    ],
    unskilled: [
      'Fluctuates in energy; starts strong, fades out',
      'Ceases effort when confronted with barriers',
      'Becomes easily distracted',
      'Stops functioning at first sign of trouble',
      'Lacks resilience and grit'
    ]
  },
  {
    id: 'T',
    letter: 'T',
    title: 'Trusting',
    isVowel: false,
    skilled: [
      'Sets and holds firm but flexible boundaries',
      'Consistently follows through on commitments',
      'Takes accountability and owns one’s part',
      'Maintains confidentiality',
      'Makes decisions in alignment with values',
      'Refrains from judgment of others'
    ],
    overused: [
      'Lacks boundaries, gets walked on',
      'Shares excessive personal info',
      'Assumes all responsibility so no one contributes',
      'Provides an overload of transparency'
    ],
    unskilled: [
      'Erodes organizational trust by violating boundaries',
      'Relies solely on self',
      'Demonstrates lack of reliability in follow-through',
      'Behaves unethically; untruthful',
      'Talks negatively about others'
    ]
  },
  {
    id: 'U',
    letter: 'U',
    title: 'Universal Understanding',
    isVowel: true,
    skilled: [
      'Sees things from viewpoints other than one’s position',
      'Puts self in others’ positions to anticipate',
      'Considers alternate perspectives in decision making',
      'Recognizes and empathizes with feelings underneath',
      'Applies emotional literacy, agility, and flexibility',
      'Shows compassion through caring',
      'Recognizes evolution of strategies'
    ],
    overused: [
      'Aligns with what is popular over what is right',
      'Determines most circumstances are extenuating',
      'Bases decisions on feelings instead of research',
      'Over relates to point of absorbing hurts',
      'Sacrifices authenticity'
    ],
    unskilled: [
      'Makes snap judgments',
      'Focuses internally',
      'Resists compromise',
      'Is viewed as self-centered',
      'Lacks empathy and compassion',
      'Holds grudges'
    ]
  },
  {
    id: 'V',
    letter: 'V',
    title: 'Voice',
    isVowel: false,
    skilled: [
      'Recognizes and speaks up for what’s not working',
      'Maintains a positive, respectful attitude',
      'Knows when to speak up and when to step back',
      'Champions an innovative solution even when unpopular',
      'Supports learners to advocate and make decisions',
      'Establishes credibility and command skills',
      'Advocates for self and others'
    ],
    overused: [
      'Views compromise as showing weakness and losing',
      'Overuses platform; when everything is shouted, nothing is heard',
      'Speaks for others instead of empowering them',
      'Continues championing a solution without buy-in'
    ],
    unskilled: [
      'Puts down others’ voices',
      'Unwilling to admit when initiative isn’t working',
      'Speaks in a way that does not command respect',
      'Complains, whines, and nags when asking for needs',
      'Grumbles and moans without offering solutions',
      'Lacks courage; risk averse'
    ]
  },
  {
    id: 'W',
    letter: 'W',
    title: 'Worldview',
    isVowel: false,
    skilled: [
      'Creates a deliberate personal brand',
      'Provides excellent stakeholder service',
      'Maintains positive reputation in public forums',
      'Aware of impact of private interactions',
      'Recognizes actions reflect on brand',
      'Strikes balance of personal/neutral/engaging presence',
      'Dresses with balance of respect and service'
    ],
    overused: [
      'Creates and lives in a false narrative',
      'Forces branding upon audience',
      'Manipulates situations so only one "persona" is conveyed',
      'Values stakeholders’ reactions above all else',
      'Concerns oneself primarily with opinions of others'
    ],
    unskilled: [
      'Underestimates the value of branding',
      'Fosters a gap in authenticity',
      'Lacks prudence in social media/dress',
      'Refuses ownership of actions',
      'Is completely unconcerned with opinions of others'
    ]
  },
  {
    id: 'X',
    letter: 'X',
    title: 'Experiential',
    isVowel: false,
    skilled: [
      'Utilizes live action, hands-on learning',
      'Offers learners a variety of immersive opportunities',
      'Provides culturally relevant materials',
      'Understands and connects with communities',
      'Strives for distraction-free environment',
      'Harnesses power of technology and partnerships',
      'Integrates creativity'
    ],
    overused: [
      'Focuses too much time on single learning experience',
      'Monopolizes school/district resources',
      'Mismanages scope and sequence due to elaborate experiences'
    ],
    unskilled: [
      'Focuses on act of teaching, not outcome of learning',
      'Provides limited learning opportunities',
      'Relies solely on outdated traditional methods',
      'Prioritizes delivery of volume over understanding',
      'Avoids lessons outside creative comfort zone'
    ]
  },
  {
    id: 'Y',
    letter: 'Y',
    title: 'Yield',
    isVowel: false,
    skilled: [
      'Measures achievement through formative and summative means',
      'Utilizes observational and actual feedback',
      'Adjusts instruction based on feedback',
      'Recognizes the many forms measurements take',
      'Ensures reasonable and fair assessments',
      'Manages balance of standards and innovation',
      'Keeps finger on pulse of satisfaction'
    ],
    overused: [
      'Defines success by test scores and metrics alone',
      'Employs excessive standardized benchmarking',
      'Uses test data to drive all decisions'
    ],
    unskilled: [
      'Relies only on one method of measurement',
      'Lacks visibility to measure progress',
      'Depends on state/district testing to assess',
      'Believes all is well without questioning'
    ]
  },
  {
    id: 'Z',
    letter: 'Z',
    title: 'Zeal',
    isVowel: false,
    skilled: [
      'Able to maintain energy, enthusiasm, joy, and hope',
      'Deliberately participates in self-care',
      'Actively pursues activities which rejuvenate',
      'Recognizes behaviors that erode positive environments',
      'Contributes to positive culture',
      'Utilizes positive outlets to discharge stress',
      'Maintains positive social support network',
      'Has fun!'
    ],
    overused: [
      'Avoids stress at all costs',
      'Promotes self-care to detriment of other responsibilities',
      'Allows self-care to affect others adversely',
      'Proclaims results of self-awareness as irrefutable facts'
    ],
    unskilled: [
      'Vents to coworkers about frustrations; gossip',
      'Invalidates others’ feelings by giving commands',
      'Internalizes stress, manifesting in anxiety',
      'Lacks basic understanding of self-care',
      'Resists need to accept feedback',
      'Exhibits workaholic tendencies',
      'Shows impatience with others’ self-care'
    ]
  }
];
