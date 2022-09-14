import React, { useState } from "react";
import axios from "axios";
const PostCreate = () => {
    const [title, setTitle] = useState("");

    const submitHandler = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:4000/posts", {
            title,
        });
        setTitle("")
    };
    return (
        <div>
            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <label htmlFor="">Title</label>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        className="form-control"
                    />
                </div>
                <button className="btn btn-primary mt-2">Submit</button>
            </form>
        </div>
    );
};

export default PostCreate;
