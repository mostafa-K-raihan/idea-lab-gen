import { useEffect, useState } from "react";
import "./IdeaContainer.scss";

type IdeaContainerProps = {};

type Idea = {
  title: string;
  description?: string;
};

const IdeaContainer = (props: IdeaContainerProps) => {
  const [ideas, setIdeas] = useState<Array<Idea>>([]);
  const [newIdea, setNewIdea] = useState<Idea>({
    title: "",
    description: "",
  });
  const localStorageAccessor = "idea-lab-ideas";

  useEffect(() => {
    const ideas = localStorage.getItem(localStorageAccessor);
    setIdeas(ideas ? JSON.parse(ideas) : null);
  }, []);

  const createIdea = () => {
    const ideas = localStorage.getItem(localStorageAccessor) ?? null;

    const updatedIdeas: Array<Idea> = [newIdea];

    if (ideas) {
      updatedIdeas.push(...JSON.parse(ideas));
    }

    localStorage.setItem(localStorageAccessor, JSON.stringify(updatedIdeas));
    setIdeas(updatedIdeas);
    setNewIdea({ title: "", description: "" });
  };

  const updateIdea =
    (name: keyof Idea) =>
    (
      event:
        | React.ChangeEvent<HTMLTextAreaElement>
        | React.ChangeEvent<HTMLInputElement>
    ) => {
      const value = event.target.value;

      setNewIdea((prev) => {
        return {
          ...prev,
          [name]: value,
        };
      });
    };

  if (ideas === null) {
    return (
      <div className="IdeaContainer-emptyState">
        <div className="IdeaContainer-formControl">
          <label className="IdeaContainer-label">Idea</label>
          <input
            className="IdeaContainer-title"
            type="text"
            value={newIdea.title}
            onChange={updateIdea("title")}
          ></input>
        </div>
        <div className="IdeaContainer-formControl">
          <label className="IdeaContainer-label">Description</label>
          <textarea
            className="IdeaContainer-description"
            rows={20}
            value={newIdea.description}
            onChange={updateIdea("description")}
          ></textarea>
        </div>

        <button className="IdeaContainer-createIdea" onClick={createIdea}>
          Create Idea!
        </button>
      </div>
    );
  }

  return (
    <div>
      {ideas.map((idea: Idea, index: number) => (
        <div key={index}>
          <p>{idea.title}</p>
          <section>{idea.description ?? "No Description"}</section>
        </div>
      ))}
    </div>
  );
};

export { IdeaContainer };
