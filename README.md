Hi Vasudha & Team,

Thank you for providing the initial information and insights regarding "Agentic RAG." After conducting some research and gathering relevant materials, I’d like to share a clearer understanding of this concept and how it relates to our current architecture.

1. What is Agentic RAG?

Agentic Retrieval-Augmented Generation (Agentic RAG) is a more advanced concept compared to traditional Large Language Models (LLMs).

Traditional LLMs primarily rely on static knowledge acquired during training to generate responses, which can lead to outdated information or hallucinations.

Agentic RAG enhances LLMs with greater autonomy, allowing them to determine whether additional information is needed and proactively perform retrieval to acquire the most up-to-date and relevant data, ensuring response accuracy.

In other words, the core idea of Agentic RAG is that LLMs do not just "answer questions" but also possess the ability to "assess whether the information is sufficient and initiate further data retrieval if necessary."

2. How Minion Assistant Relates to Agentic RAG

Looking at our current Minion Assistant architecture, it already incorporates some core elements of Agentic RAG:

Minion Assistant enables users to query internal databases (such as Athena and RDS) using natural language through NLP processing and API integration.

It also leverages LLMs to enhance the readability and usability of retrieved data.

However, compared to mainstream Agentic RAG implementations, Minion Assistant appears to lack a crucial component—LLM-driven decision-making on whether further retrieval is necessary, followed by multi-step retrieval execution.

From my understanding, Minion Assistant currently does not implement an iterative validation mechanism, meaning that once an LLM receives a query, it translates it into a retrieval request, executes a single search via the Minion API, and returns the result—without further assessing whether the retrieved data is sufficient.

3. Common Practices in the Industry

In some mainstream Agentic RAG applications, this process is typically facilitated by an Agent Layer, such as frameworks like LangChain.

This layer enables the LLM to autonomously evaluate retrieval results and decide whether additional queries are needed, or even dynamically adjust query strategies based on results.

A typical process might include:

The LLM executes an initial query based on the user’s input.

It evaluates whether the returned data is sufficient.

If the data is insufficient, it dynamically adjusts query parameters and re-executes the search.

The LLM generates a final response only when adequate data has been retrieved.

This approach ensures that responses are based on the most comprehensive and up-to-date information rather than relying solely on a single retrieval attempt.

4. Does Minion Assistant Currently Have an Iterative Retrieval Mechanism?

Based on the current architecture, I am not certain whether Minion Assistant already includes a mechanism for dynamically refining queries based on retrieval results or if it primarily relies on a single-step retrieval approach.

If our system already has such an iterative mechanism, perhaps we just need to better understand and utilize this capability. However, if it does not currently exist, this might be an area worth further exploration. Below, I’ve included a comparative diagram for reference:

5. Conclusion

From what I have observed in industry practices, the ability to autonomously decide on multi-step retrieval is a key characteristic of Agentic RAG. Our current Minion Assistant architecture already aligns closely with this concept, though there may be some room for further exploration in this particular area. If a framework like LangChain were introduced, it might allow us to fully align with mainstream approaches.

These are my observations and insights based on my research over the past couple of days. I welcome any thoughts or feedback from the team. Thanks!

Regards,
