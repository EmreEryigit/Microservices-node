import React, { useState } from "react";
import axios from "axios";

const CommentCreate = ({ postId }) => {
    const [comment, setComment] = useState("");

    const submitHandler = async (e) => {
        e.preventDefault();
        await axios.post(`http://posts.com/posts/${postId}/comments`, {
            content: comment,
        });
        setComment("")
    };
    return (
        <div>
            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <input
                    placeholder="Comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        type="text"
                        className="form-control"
                    />
                </div>
                <button className="btn btn-primary mt-2">Submit</button>
            </form>
        </div>
    );
};

export default CommentCreate;
