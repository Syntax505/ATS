type freeSession = {
  time: { date: ""; hour: ""; minute: "" };
};

export async function findFreeSession(data, conflict): Promise<freeSession> {
  const sessionToReturn: freeSession = {
    time: { date: "", hour: "", minute: "" },
  };

  return sessionToReturn;
}
