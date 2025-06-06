-- Insert sample reference materials for legal knowledge base
INSERT INTO public.reference_materials (title, content, summary, tags, category, source, citation, jurisdiction) VALUES
(
  'Oklahoma Survivors Act Overview',
  'The Oklahoma Survivors Act (SB1835; 22 O.S. §§ 1090.1-1090.5) provides a mechanism for survivors of domestic violence to petition for relief from criminal convictions that resulted from their victimization. The Act recognizes that survivors may have been coerced into criminal activity through abuse and provides a pathway for legal remedy.',
  'Overview of the Oklahoma Survivors Act and its provisions for domestic violence survivors',
  ARRAY['oklahoma', 'survivors act', 'domestic violence', 'post-conviction relief'],
  'statutory_analysis',
  'Oklahoma Statutes',
  '22 O.S. §§ 1090.1-1090.5',
  'Oklahoma'
),
(
  'Constitutional Due Process Requirements',
  'The Fourteenth Amendment to the U.S. Constitution guarantees that no state shall "deprive any person of life, liberty, or property, without due process of law." In the context of post-conviction relief, due process requires adequate notice, opportunity to be heard, and fair procedures.',
  'Constitutional requirements for due process in post-conviction proceedings',
  ARRAY['constitution', 'due process', 'fourteenth amendment', 'post-conviction'],
  'constitutional_argument',
  'U.S. Constitution',
  'U.S. Const. amend. XIV',
  'Federal'
),
(
  'Equal Protection Analysis Framework',
  'Equal protection analysis under the Fourteenth Amendment requires that similarly situated individuals be treated alike. When a law creates classifications, courts apply different levels of scrutiny: rational basis, intermediate scrutiny, or strict scrutiny, depending on the nature of the classification.',
  'Framework for analyzing equal protection claims under the Fourteenth Amendment',
  ARRAY['equal protection', 'constitutional law', 'scrutiny levels', 'classification'],
  'equal_protection',
  'Constitutional Law',
  'U.S. Const. amend. XIV, § 1',
  'Federal'
),
(
  'Trauma-Informed Sentencing Principles',
  'Trauma-informed sentencing recognizes the impact of trauma on criminal behavior and incorporates this understanding into sentencing decisions. Research shows that trauma, particularly from domestic violence, can significantly affect decision-making and behavior.',
  'Principles and research supporting trauma-informed approaches to sentencing',
  ARRAY['trauma', 'sentencing', 'domestic violence', 'rehabilitation'],
  'expert_testimony',
  'Academic Research',
  'Various psychological and legal studies',
  'General'
);

-- Insert sample templates
INSERT INTO public.templates (user_id, title, description, content, category, tags, is_public, is_featured) VALUES
(
  '00000000-0000-0000-0000-000000000000', -- System user for public templates
  'Motion for Post-Conviction Relief Template',
  'Standard template for filing post-conviction relief motions under the Oklahoma Survivors Act',
  'IN THE DISTRICT COURT OF [COUNTY] COUNTY
STATE OF OKLAHOMA

[PETITIONER NAME],
    Petitioner,

v.                                    Case No. [CASE_NUMBER]

THE STATE OF OKLAHOMA,
    Respondent.

MOTION FOR POST-CONVICTION RELIEF
PURSUANT TO THE OKLAHOMA SURVIVORS ACT

TO THE HONORABLE COURT:

COMES NOW Petitioner, [PETITIONER_NAME], by and through undersigned counsel, and respectfully moves this Honorable Court for post-conviction relief pursuant to the Oklahoma Survivors Act, 22 O.S. §§ 1090.1-1090.5, and in support thereof states as follows:

I. PROCEDURAL BACKGROUND

1. On [CONVICTION_DATE], Petitioner was convicted of [OFFENSE] in Case No. [ORIGINAL_CASE_NUMBER].

2. Petitioner was sentenced to [SENTENCE].

3. This motion is timely filed within the statute of limitations provided by the Oklahoma Survivors Act.

II. FACTUAL BACKGROUND

[DETAILED_FACTS_OF_ABUSE]

III. LEGAL ARGUMENT

A. Petitioner Qualifies for Relief Under the Oklahoma Survivors Act

[LEGAL_ARGUMENTS]

IV. CONCLUSION

WHEREFORE, Petitioner respectfully requests that this Court grant this Motion for Post-Conviction Relief and provide such other relief as the Court deems just and proper.

Respectfully submitted,

[ATTORNEY_NAME]
[BAR_NUMBER]
[LAW_FIRM]
[ADDRESS]
[PHONE]
[EMAIL]

Attorney for Petitioner',
  'hearing_request',
  ARRAY['post-conviction', 'survivors act', 'motion', 'template'],
  true,
  true
),
(
  '00000000-0000-0000-0000-000000000000',
  'Constitutional Challenge Brief Template',
  'Template for constitutional challenges in post-conviction proceedings',
  'MEMORANDUM OF LAW IN SUPPORT OF CONSTITUTIONAL CHALLENGE

I. INTRODUCTION

Petitioner respectfully submits this memorandum in support of the position that [CHALLENGED_LAW] violates the [CONSTITUTIONAL_PROVISION] of the United States Constitution and Article [ARTICLE] of the Oklahoma Constitution.

II. STATEMENT OF THE CASE

[CASE_BACKGROUND]

III. LEGAL STANDARD

[APPLICABLE_STANDARD_OF_REVIEW]

IV. ARGUMENT

A. The Challenged Law Violates [CONSTITUTIONAL_PROVISION]

1. Substantial Burden Analysis
[BURDEN_ANALYSIS]

2. Government Interest Analysis
[INTEREST_ANALYSIS]

3. Narrow Tailoring Analysis
[TAILORING_ANALYSIS]

V. CONCLUSION

For the foregoing reasons, Petitioner respectfully requests that this Court find [CHALLENGED_LAW] unconstitutional and grant appropriate relief.',
  'constitutional_argument',
  ARRAY['constitutional', 'challenge', 'brief', 'template'],
  true,
  true
);
