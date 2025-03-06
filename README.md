Hi Vasudha & Team,

Regarding the idea of conducting a simple POC using public data, I actually find it quite interesting and plan to explore it over the weekend or whenever I have some spare time. If I manage to make any meaningful progress, I'll definitely share my insights with everyone.

When I initially looked into the RAG architecture, I also noticed that the mainstream approach generally utilizes Vector DB for handling unstructured data. This prompted me to wonder: "Do we really need to convert our existing structured data into vectors before we can start experimenting?" I raised this question to an AI, and the response suggested that it's not strictly necessary to transform our data into vector format. Instead, we could achieve a similar RAG-like effect by performing multi-step relational database queries via existing APIs.

Of course, this is still theoretical, and specific implementation details would need further exploration and discussion. Perhaps, as we start experimenting practically with LangChain through this POC, the answers to these questions might gradually become clearer. My assumption is that LangChain should be capable of handling this scenario since API-based retrieval seems theoretically feasible.

These are just some initial thoughts. Any additional insights or suggestions from the team would be greatly appreciated!
