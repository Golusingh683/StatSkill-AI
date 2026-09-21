// A bank of realistic MCQs grouped by topic. aiService.generateMcqs()
// draws from this bank to "simulate" AI generation from an uploaded
// document. Replace aiService's internals with a real model call later;
// this file can remain as a offline fallback / seed data.

export const quizBank = {
  Sampling: [
    {
      question: 'What is the main advantage of stratified sampling over simple random sampling?',
      options: [
        'It always requires a smaller sample size',
        'It ensures representation of important subgroups and can reduce variance',
        'It removes the need for a sampling frame',
        'It guarantees zero non-response',
      ],
      correctIndex: 1,
      explanation: 'Stratified sampling groups the population into homogeneous strata, which improves precision when subgroups differ from one another.',
      difficulty: 'Medium',
      topic: 'Sampling',
    },
    {
      question: 'In a two-stage sample design, what is typically selected in the first stage?',
      options: ['Individual respondents', 'First Stage Units (e.g. villages or blocks)', 'Survey questions', 'Data entry operators'],
      correctIndex: 1,
      explanation: 'The first stage usually selects larger clusters (FSUs) such as villages or urban blocks, from which households are drawn in the second stage.',
      difficulty: 'Easy',
      topic: 'Sampling',
    },
    {
      question: 'Probability Proportional to Size (PPS) sampling assigns selection probability based on:',
      options: ['Alphabetical order', 'A measure of the unit\'s size', 'Random chance only', 'Respondent age'],
      correctIndex: 1,
      explanation: 'PPS gives larger units (by population or another size measure) a proportionally higher chance of selection.',
      difficulty: 'Medium',
      topic: 'Sampling',
    },
    {
      question: 'A sampling frame that excludes a portion of the target population introduces:',
      options: ['Sampling error only', 'Coverage error', 'Measurement error', 'No error, since sampling still occurs'],
      correctIndex: 1,
      explanation: 'Coverage error arises when the sampling frame does not fully represent the target population.',
      difficulty: 'Hard',
      topic: 'Sampling',
    },
  ],
  'Data Visualization': [
    {
      question: 'Which chart type is most appropriate for showing change over time?',
      options: ['Pie chart', 'Line chart', 'Bubble chart', 'Radar chart'],
      correctIndex: 1,
      explanation: 'Line charts are well suited to continuous trends across an ordered axis such as time.',
      difficulty: 'Easy',
      topic: 'Data Visualization',
    },
    {
      question: 'Using 3D effects on bar charts in an official dashboard is generally discouraged because it:',
      options: ['Improves readability', 'Distorts perceived values and reduces clarity', 'Is required by accessibility standards', 'Increases load speed'],
      correctIndex: 1,
      explanation: '3D distortion can mislead viewers about relative magnitudes, which is risky in official reporting.',
      difficulty: 'Medium',
      topic: 'Data Visualization',
    },
    {
      question: 'When comparing parts of a whole across many categories, a common alternative to a pie chart is:',
      options: ['A stacked or grouped bar chart', 'A scatter plot', 'A single number card', 'A gauge chart'],
      correctIndex: 0,
      explanation: 'Bar-based charts are usually easier to compare accurately than many pie slices.',
      difficulty: 'Medium',
      topic: 'Data Visualization',
    },
  ],
  'Data Quality': [
    {
      question: 'Which of the following is NOT typically considered a data quality dimension?',
      options: ['Accuracy', 'Timeliness', 'Font styling', 'Coherence'],
      correctIndex: 2,
      explanation: 'Accuracy, timeliness and coherence are recognised data quality dimensions; font styling is a presentation choice, not a quality dimension.',
      difficulty: 'Easy',
      topic: 'Data Quality',
    },
    {
      question: 'Range checks during data entry are used to:',
      options: ['Flag values outside plausible limits', 'Automatically increase sample size', 'Replace supervisor review', 'Translate survey language'],
      correctIndex: 0,
      explanation: 'Range checks catch implausible values (e.g. negative age) at the point of entry.',
      difficulty: 'Easy',
      topic: 'Data Quality',
    },
    {
      question: 'Consistency checks across related survey questions primarily help detect:',
      options: ['Typing speed', 'Logical contradictions in responses', 'Internet connectivity issues', 'Respondent income level'],
      correctIndex: 1,
      explanation: 'Consistency checks compare related answers to catch contradictions, such as an employed status with zero reported working hours.',
      difficulty: 'Medium',
      topic: 'Data Quality',
    },
  ],
  'Data Analysis': [
    {
      question: 'Before running analysis on collected survey data, which step is most important?',
      options: ['Publishing preliminary results', 'Cleaning the data for missing/invalid values', 'Deleting all outliers immediately', 'Skipping documentation'],
      correctIndex: 1,
      explanation: 'Data cleaning ensures the analysis is based on valid, well-structured data.',
      difficulty: 'Easy',
      topic: 'Data Analysis',
    },
    {
      question: 'An unusually high value in a dataset should generally be:',
      options: ['Deleted without review', 'Investigated before deciding how to treat it', 'Automatically averaged out', 'Ignored'],
      correctIndex: 1,
      explanation: 'Outliers can be genuine or erroneous; investigation should precede any treatment decision.',
      difficulty: 'Medium',
      topic: 'Data Analysis',
    },
    {
      question: 'Which measure describes the central tendency of a skewed distribution better than the mean?',
      options: ['Median', 'Range', 'Standard deviation', 'Variance'],
      correctIndex: 0,
      explanation: 'The median is less sensitive to extreme values than the mean, making it more robust for skewed data.',
      difficulty: 'Medium',
      topic: 'Data Analysis',
    },
  ],
  'Statistical Methods': [
    {
      question: 'An estimator whose expected value equals the true population parameter is:',
      options: ['Biased', 'Unbiased', 'Inconsistent', 'Irrelevant'],
      correctIndex: 1,
      explanation: 'Unbiasedness means the estimator does not systematically over- or under-estimate the parameter.',
      difficulty: 'Medium',
      topic: 'Statistical Methods',
    },
    {
      question: 'A 95% confidence interval means:',
      options: [
        'There is a 95% chance the parameter changes',
        'If repeated sampling were done, about 95% of such intervals would contain the true parameter',
        'The sample is 95% accurate',
        'The data is normally distributed',
      ],
      correctIndex: 1,
      explanation: 'Confidence level describes the long-run proportion of intervals (across repeated samples) expected to contain the true parameter.',
      difficulty: 'Hard',
      topic: 'Statistical Methods',
    },
  ],
  'Survey Methodology': [
    {
      question: 'Pilot testing a questionnaire mainly helps to:',
      options: ['Reduce the number of enumerators needed', 'Identify unclear or problematic questions before full rollout', 'Eliminate the need for supervision', 'Increase respondent burden'],
      correctIndex: 1,
      explanation: 'Piloting surfaces wording, sequencing and comprehension issues early, when they are cheaper to fix.',
      difficulty: 'Easy',
      topic: 'Survey Methodology',
    },
    {
      question: 'Non-response bias occurs when:',
      options: [
        'All sampled units respond',
        'Non-respondents differ systematically from respondents in relevant ways',
        'The survey has a large sample size',
        'Data is collected electronically',
      ],
      correctIndex: 1,
      explanation: 'If those who do not respond differ meaningfully from respondents, survey estimates can be biased.',
      difficulty: 'Medium',
      topic: 'Survey Methodology',
    },
  ],
  'Official Statistics': [
    {
      question: 'Which ministry coordinates statistical activities across the Government of India?',
      options: ['Ministry of Statistics and Programme Implementation', 'Ministry of Finance', 'Ministry of Home Affairs', 'Ministry of Education'],
      correctIndex: 0,
      explanation: 'MoSPI is the nodal ministry for statistical coordination, standards and major national surveys.',
      difficulty: 'Easy',
      topic: 'Official Statistics',
    },
  ],
}

export const quizTopics = Object.keys(quizBank)
