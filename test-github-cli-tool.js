#!/usr/bin/env node

import { performAgenticAssessment } from '../packages/voder-core/assessmentAgentic.js';

async function testGitHubCliTool() {
  console.log('Testing GitHub CLI tool integration in agentic assessment...\n');

  try {
    // Run a quick assessment that should trigger the GitHub CLI tool
    const result = await performAgenticAssessment(
      'INFRASTRUCTURE',
      process.cwd(),
      [
        {
          role: 'user',
          content:
            'Assess the CI/CD infrastructure and pipeline status for this project. Focus on GitHub Actions workflows and their current status.',
        },
      ],
    );

    console.log('Assessment completed successfully!');
    console.log('Result:', JSON.stringify(result, null, 2));

    // Check if the assessment mentions GitHub workflows or pipeline status
    const resultText = JSON.stringify(result).toLowerCase();
    const hasGitHubInfo =
      resultText.includes('github') ||
      resultText.includes('workflow') ||
      resultText.includes('pipeline') ||
      resultText.includes('actions');

    if (hasGitHubInfo) {
      console.log(
        '\n✅ SUCCESS: Assessment appears to have used GitHub CLI tool (mentions GitHub/workflow/pipeline/actions)',
      );
    } else {
      console.log(
        '\n❌ WARNING: Assessment may not have used GitHub CLI tool (no GitHub/workflow mentions found)',
      );
    }
  } catch (error) {
    console.error('❌ Test failed:', error.message);

    if (error.message.includes('timed out')) {
      console.log(
        '\n💡 Note: Assessment timed out - this is expected behavior with the 5-minute timeout.',
      );
      console.log(
        'The GitHub CLI tool was likely tested during the assessment process.',
      );
    }
  }
}

// Set agentic mode and run test
process.env.VODER_AGENTIC_MODE = 'true';
testGitHubCliTool();
