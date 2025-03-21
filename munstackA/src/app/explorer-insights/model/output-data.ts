interface OutputData {
  overview: {
    model: string;
    context: string;
  };
  managementChallenges: Array<{
    name: string;
    description: string;
    strategy: string;
  }>;
  opportunityAreas: Array<{
    name: string;
    description: string;
    action: string;
  }>;
}
