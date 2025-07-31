/**
 * simple component to render our reusable submit button , teakes content :string as param
*/
export default function Button({content}:{content:string}) { 
    return (
        <button type="submit" className="bg-accent hover:bg-accent-hover transition duration-300 py-2 rounded-lg w-1/2 self-center cursor-pointer">
            { content}
        </button>
    );
}