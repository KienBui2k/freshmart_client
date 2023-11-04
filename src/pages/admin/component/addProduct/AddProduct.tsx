import "./addProduct.scss"
import { useSelector, useDispatch } from 'react-redux';
import { StoreType } from "@/stores";
import { FormEvent, MutableRefObject, useRef, useState } from "react";
import { Popconfirm, message } from "antd";
import { MdOutlineDeleteForever } from "react-icons/md";
import apis from "@/services/Apis";
import { Picture } from "@/interfaces/Interface";
import { productAction } from "@/stores/slices/product.slice";
interface Category {
    id: string;
    title: string;
}
interface ProductOption {
    price: number;
    optionName: string;
}
// interface Picture {
//     image: File;
//     url: string;
// }
export default function AddProduct() {
    const categoryStore = useSelector((store: StoreType) => store.categoryStore)
    const [productOptions, setProductOptions] = useState<ProductOption[]>([]);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const imgPreviewRef: MutableRefObject<HTMLImageElement | null> = useRef(null);
    const [pictures, setPictures] = useState<Picture[]>([]);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);


    function addProductOption() {
        setProductOptions([...productOptions, { price: 0, optionName: "" }]);
    }
    function deleteProductOption(index: any) {
        const updatedProductOptions = [...productOptions];
        updatedProductOptions.splice(index, 1);
        setProductOptions(updatedProductOptions);
    }
    const text = 'Are you sure to delete this task?';
    const description = 'Delete the task';
    function removePicture(index: number) {
        const newPictures = [...pictures];
        newPictures.splice(index, 1);
        setPictures(newPictures);
    }
    async function addNewProduct(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        try {
            let formData = new FormData();
            formData.append("product", JSON.stringify({
                categoryId: (e.target as any).categoryId.value,
                name: (e.target as any).name.value,
                des: (e.target as any).des.value,
                product_option: productOptions,
            }));
            formData.append("imgs", avatarFile!);

            for (let i in pictures) {
                formData.append("imgs", pictures[i].image)
            }
            await apis.productApi.create(formData)
                .then(res => {
                    setLoading(false)
                    dispatch(productAction.setNewProduct(res.data.data))
                    message.success(res.data.message)

                }
                )
                .catch(err => setLoading(false)
                )

            // message.success(response.data.message);
        } catch (err) {
            message.error("đã xảy ra lỗi trong quá trình add Product")
        }
    }
    return (
        <div className="add_product_section">
            <div className="add_product_header">
                Add Product
            </div>
            <div className="add_product_content">
                <form onSubmit={(e) => addNewProduct(e)} className="add_product_form">
                    <div className="left_content">
                        <div className="product_info">
                            <h3>Produtct Info</h3>
                            <div className='category_option'>
                                <span> Category :</span>
                                <select name="categoryId">
                                    {
                                        categoryStore.data?.map((category: Category) =>


                                            <option key={Math.random() * Date.now()} value={category.id}>{category.title}</option>
                                        )
                                    }
                                </select>
                            </div>
                            <div className='new_product_name'>
                                <span>Name :</span>
                                <input name='name' type="text" placeholder='New product name' required />
                            </div>
                            <div className='new_product_des'>
                                <span>Des :</span>
                                <input name='des' type="text" placeholder='New product description' />
                            </div>
                            <div className="listOption">
                                {productOptions.map((productOption, index) => (
                                    <div className="optionItem">
                                        <span>
                                            <span>Option : {index + 1} </span>
                                            <p onClick={() => deleteProductOption(index)}>Delete</p>
                                        </span>
                                        <input type="text" name="optionName" placeholder="Name option..."
                                            onChange={(e) => {
                                                const updatedProductOptions = [...productOptions];
                                                updatedProductOptions[index].optionName = e.target.value;
                                                setProductOptions(updatedProductOptions);
                                            }} />
                                        <input type="text" name="price" placeholder="Price..."
                                            onChange={(e) => {
                                                const updatedProductOptions = [...productOptions];
                                                updatedProductOptions[index].price = parseFloat(e.target.value);
                                                setProductOptions(updatedProductOptions);
                                            }} />
                                    </div>

                                ))}
                            </div>
                            <div className="add_option_btn">
                                <span onClick={() => {
                                    addProductOption()
                                }}>add option</span>
                            </div>

                        </div>
                    </div>
                    <div className="right_content">

                        <div className="product_avatar">
                            <h3>Product avatar</h3>
                            <div className="input_img">
                                <input type="file" name='file' required onChange={(e) => {
                                    if (e.target.files) {
                                        if (e.target.files.length > 0) {
                                            (imgPreviewRef.current! as HTMLImageElement).src = URL.createObjectURL(e.target.files[0]);
                                            setAvatarFile(e.target.files[0])
                                        }
                                    }
                                }} />
                            </div>
                            <div className="avatar">
                                <img ref={imgPreviewRef} />
                            </div>
                        </div>

                        <div className="produc_picture">
                            <h3> images</h3>
                            <div>
                                <input type="file" name='imgs' multiple onChange={(e) => {
                                    if (e.target.files) {
                                        if (e.target.files.length > 0) {
                                            let temPictures: Picture[] = [];
                                            for (let i in e.target.files) {
                                                if (i == "length") {
                                                    break
                                                }
                                                temPictures.push({
                                                    image: e.target.files[i],
                                                    url: URL.createObjectURL(e.target.files[i])
                                                })
                                            }
                                            setPictures(temPictures)
                                        }
                                    }
                                }} />
                            </div>
                            <div className="product_listImg">
                                {pictures.map((picture, index) => (
                                    <div className='product_img' key={index}>
                                        <img src={picture.url} />
                                        <Popconfirm
                                            placement="top"
                                            title={text}
                                            description={description}
                                            onConfirm={() => removePicture(index)}
                                            okText={<span className="custom-ok-button">Yes</span>}
                                            cancelText="No"
                                        >
                                            <span><MdOutlineDeleteForever /></span>
                                        </Popconfirm>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="save_btn"> <button type="submit">{loading ? <span className='loading-spinner'></span> : "Save"}</button>
                           
                        </div>
                    </div>

                </form>
            </div>
        </div>
    )
}
