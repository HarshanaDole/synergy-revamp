import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import ActionPopup from "../components/ActionPopup";
import Uploader from "../components/Uploader";
import Header from "../components/Header";
import "../css/addBlog.css";
import { BlogInput } from "../../network/blogs_api";
import * as BlogsApi from "../../network/blogs_api";
import { Blog } from "../models/blog";

const AddEditBlog = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [existingBlog, setExistingBlog] = useState<Blog | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const [defaultImage, setDefaultImage] = useState<string | null>(null);
  const [showImageError, setShowImageError] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState<"success" | "error">("error");

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    control,
    formState: { errors, isSubmitting, dirtyFields },
  } = useForm<BlogInput>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subheadings",
  });

  useEffect(() => {
    const fetchBlog = async () => {
      if (id) {
        try {
          const blog = await BlogsApi.fetchBlog(id);
          setExistingBlog(blog);
          setDefaultImage(blog.imageUrl);
          setValue("headline", blog.headline);
          setValue("author", blog.author);
          setValue("subheadings", blog.subheadings);
          setImage(null);
        } catch (error) {
          console.error(error);
        }
      } else {
        setValue("subheadings", [{ subheading: "", content: "" }]);
      }
    };
    fetchBlog();
  }, [id, setValue]);

  const handleImageChange = (file: File | null) => {
    setImage(file);
    setShowImageError(false);
  };

  const validateForm = async () => {
    const isValid = await trigger();
    let hasError = false;

    if (!image && !defaultImage) {
      setShowImageError(true);
      hasError = true;
    } else {
      setShowImageError(false);
    }

    if (!isValid || hasError) {
      setPopupMessage("Please fix the errors in the form");
      setPopupType("error");
      setShowPopup(true);
    }

    return isValid && !hasError;
  };

  async function onBlogSubmit(input: BlogInput) {
    const isValid = await validateForm();

    if (!isValid) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append("headline", input.headline);
      formData.append("author", input.author);
      formData.append("subheadings", JSON.stringify(input.subheadings));
      if (image) {
        formData.append("imageUrl", image);
      }

      if (existingBlog) {
        const updatedBlog = await BlogsApi.updateBlog(
          existingBlog.id,
          formData
        );
        onBlogSave(updatedBlog, "Blog updated successfully!");
      } else {
        const newBlog = await BlogsApi.createBlog(formData);
        onBlogSave(newBlog, "Blog added successfully!");
      }
    } catch (error) {
      console.error(error);
      onBlogSaveError("Failed to save blog");
    }
  }

  async function onBlogSave(blog: Blog, message: string) {
    console.log("Blog Saved", blog);
    navigate("/admin/blogs", {
      state: { showPopup: true, message, type: "success" },
    });
  }

  async function onBlogSaveError(message: string) {
    navigate("/admin/blogs", {
      state: { showPopup: true, message, type: "error" },
    });
  }

  return (
    <>
      <Header />
      <section className="page-layout" id="section">
        <div className="add-items">
          <h1>{existingBlog ? "Edit Blog" : "Add New Blog"}</h1>
          <form
            id="addEditBlogForm"
            onSubmit={handleSubmit(onBlogSubmit)}
            className="form-container"
            encType="multipart/form-data"
          >
            <Uploader
              setImage={setImage}
              onImageChange={handleImageChange}
              image={image}
              setDefaultImage={setDefaultImage}
              defaultImage={defaultImage}
              showError={showImageError}
            />
            <div className="blog-input">
              <div className="input-row">
                <div className="input-box-container">
                  <div className="title-container">
                    <span className="title">Headline</span>
                    <span className="required">*</span>
                  </div>
                  <div
                    className={`input-box ${
                      errors.headline
                        ? "invalid"
                        : dirtyFields.headline
                        ? "valid"
                        : ""
                    }`}
                  >
                    <input
                      type="text"
                      {...register("headline", {
                        required: "Headline is required",
                      })}
                      autoComplete="off"
                    />
                    {errors.headline && (
                      <p className="error-message">{errors.headline.message}</p>
                    )}
                  </div>
                </div>

                <div className="input-box-container">
                  <div className="title-container">
                    <span className="title">Author</span>
                    <span className="required">*</span>
                  </div>
                  <div
                    className={`input-box ${
                      errors.author
                        ? "invalid"
                        : dirtyFields.author
                        ? "valid"
                        : ""
                    }`}
                  >
                    <input
                      type="text"
                      {...register("author", {
                        required: "Author is required",
                      })}
                      autoComplete="off"
                    />
                    {errors.author && (
                      <p className="error-message">{errors.author.message}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="subsection-container">
                {fields.map((section, index) => (
                  <div key={section.id}>
                    <div className="input-box-container">
                      <div className="title-container">
                        <span className="title">Subheading {index + 1}</span>
                        <span className="required">*</span>
                      </div>
                      <div
                        className={`input-box ${
                          errors.subheadings
                            ? "invalid"
                            : dirtyFields.subheadings
                            ? "valid"
                            : ""
                        }`}
                      >
                        <input
                          type="text"
                          {...register(`subheadings.${index}.subheading`, {
                            required: "Subheading is required",
                          })}
                          defaultValue={section.subheading}
                        />
                        {errors.subheadings?.[index]?.subheading && (
                          <p className="error-message">
                            {errors?.subheadings[index]?.subheading?.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="input-area-container">
                      <div className="title-container">
                        <span className="title">Content {index + 1}</span>
                        <span className="required">*</span>
                      </div>
                      <div
                        className={`input-area ${
                          errors.subheadings
                            ? "invalid"
                            : dirtyFields.subheadings
                            ? "valid"
                            : ""
                        }`}
                      >
                        <textarea
                          {...register(`subheadings.${index}.content`, {
                            required: "Content is required",
                          })}
                          defaultValue={section.content}
                        ></textarea>
                      </div>
                      {errors.subheadings?.[index]?.content && (
                        <p className="error-message">
                          {errors?.subheadings[index]?.content?.message}
                        </p>
                      )}
                    </div>
                    <button
                      type="button"
                      className="remove-button"
                      onClick={() => remove(index)}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="btn-container">
              <button
                type="button"
                className="add-button"
                onClick={() => append({ subheading: "", content: "" })}
              >
                + Add Subheading & Content
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="submit-button"
              >
                {isSubmitting ? "Saving..." : "Save Blog"}
              </button>
            </div>
          </form>
        </div>
      </section>
      {showPopup && (
        <ActionPopup
          message={popupMessage}
          type={popupType}
          onClose={() => setShowPopup(false)}
          position="top-right"
        />
      )}
    </>
  );
};

export default AddEditBlog;
