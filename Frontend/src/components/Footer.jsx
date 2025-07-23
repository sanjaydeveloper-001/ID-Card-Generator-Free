import { FiLinkedin, FiGithub , FiTwitter } from "react-icons/fi";
import { BiLogoGmail } from "react-icons/bi";
import { useState } from "react";

function Footer() {
  const [formStatus, setFormStatus] = useState("");

  const [formData, setFormData] = useState({
    comment: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("Sending...");

    const data = new FormData();
    data.append("comment", formData.comment);

    try {
      const response = await fetch("https://formspree.io/f/myzjkykd", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: data,
      });

      if (response.ok) {
        setFormStatus("Thank you for your feedback!");
        setFormData({ comment: "" });
      } else {
        setFormStatus("Oops! Something went wrong.");
      }
    } catch (error) {
      setFormStatus("Error submitting form.");
    }
  };

  return (
    <div className="w-full h-max bg-blue-200/70 px-15 flex justify-between items-center py-5">
      <div className="w-[30%] h-full flex flex-col justify-between gap-5">
        <div>
          <h1 className="font-bold text-3xl">Give FeedBack 😍</h1>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 items-start">
          <h1>Do you have any thoughts you'd like to share?</h1>
          <textarea
            className="outline-none inset-shadow-[1px_1px_7px_gray] focus:inset-shadow-[1px_1px_7px_brown] w-full h-20 pl-2 pt-2 rounded-[5px] "
            name="comment"
            id="comment"
            rows="1"
            value={formData.comment}
            onChange={handleChange}
            required
            placeholder="Type Here..."
            ></textarea>

          <div className="flex justify-center items-center gap-2">
            <button type="submit" className="p-2 px-5 bg-blue-400 rounded-2xl text-white hover:bg-blue-500 cursor-pointer">Send Feedback</button>
            <div className={`${formStatus.includes('Thank') ? 'text-green-500' : 'text-red-500'}`}>{formStatus}</div>
          </div>
        </form>
      </div>

      <div className="w-[2px] h-50 bg-black/60" ></div>

      <div className="flex flex-col gap-5">
        <h1 className="font-bold text-4xl">Contact Us</h1>
        <div className="w-50 h-[3px] bg-black"></div>
        <ul className="flex gap-5 text-blue-500">
          <li className="text-2xl hover:text-red-800">
            <a href="https://www.linkedin.com/in/josanweb/" target="_blank">
              <FiLinkedin />
            </a>
          </li>
          <li className="text-2xl hover:text-red-800">
            <a href="https://github.com/sanjaydeveloper-001" target="_blank">
              <FiGithub />
            </a>
          </li>
          <li className="text-2xl hover:text-red-800">
            <a href="mailto:josephstudent001@gmail.com" >
              <BiLogoGmail />
            </a>
          </li>
          <li className="text-2xl hover:text-red-800" target="_blank" >
            <a href="https://x.com/Sanjay_dev_001" >
              <FiTwitter />
            </a>
          </li>
        </ul>

        <div className="mt-5">
          <h1>© 2025 ID Card Generator. All rights reserved. Built with ❤️ by Sanjay</h1>
        </div>
      </div>

    </div>
  );
}

export default Footer;
