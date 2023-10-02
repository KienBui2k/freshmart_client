import "./addCategory.scss"
import { FormEvent, MutableRefObject, useRef, useState } from 'react';
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import apis from "@/services/Apis";
import { categoryAction } from "@/stores/slices/category.slices";

interface Category {
    title: string;
    avatar: string;
}
export default function AddCategory() {
    const dispatch = useDispatch();
    const imgPreviewRef: MutableRefObject<HTMLImageElement | null> = useRef(null);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);

    function addNewCategory(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        let formData = new FormData();
        let title = (e.target as any).title.value;
        formData.append("category", JSON.stringify(
            title
        ))
        formData.append("imgs", avatarFile!)

        apis.categoryApi.create(formData)
            .then(res => {
                dispatch(categoryAction.setNewCategory(res.data.data))
                setAvatarFile(null);
                const titleInput = document.querySelector<HTMLInputElement>("#title");
                if (titleInput) {
                    titleInput.value = "";
                }
                message.success("add category successe")
            })
            .catch(err => {
                message.error("add category failed")
            })
    }
    return (
        <div className="add_category_section">
            <div className="add_category_header">
                Add Category
            </div>
            <div className="add_category_content">
                <form
                    onSubmit={(e) => {
                        addNewCategory(e);
                    }}
                    className="addform">
                    <div className="add_categoty_title">
                        <h2>Category title</h2>
                        <div className="group_input">
                            <input className="input_text" name='title' id='title' placeholder="Enter Category title"></input>
                            <button className='btn_add_newCategory' type='submit'><span>Save</span></button>
                        </div>

                    </div>
                    <div className="add_category_avatar">
                        <input type="file" name='imgs' onChange={(e) => {
                            if (e.target.files) {
                                if (e.target.files.length > 0) {
                                    (imgPreviewRef.current! as HTMLImageElement).src = URL.createObjectURL(e.target.files[0]);
                                    setAvatarFile(e.target.files[0])
                                }
                            }
                        }} />
                        <div className="category_avatar">
                            <img ref={imgPreviewRef} alt="" />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
