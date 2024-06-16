import React from "react";
import { Helmet } from "react-helmet";
import { cn } from "@bem-react/classname";

const bem = cn("Home");

export const Home: React.FC = () => {
  return (
    <div className={bem()}>
      <Helmet title="Welcome" />
      <div className="row">
        <div className="col bg-orange text-white py-4 bg-opacity-75">
          <p className="display-3">Welcome to Kogtetochka store!</p>
          <p className="lead">
            We have a large assortment of scratching posts!
          </p>
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-12 col-md-4 bg-light py-3">
          <h1>Stability</h1>
          <p className="lead">
            Our scratching posts are crafted with precision and designed for
            unparalleled stability. Made from high-quality materials, they
            provide a sturdy platform for your cat's scratching needs.
          </p>
        </div>
        <div className="col-12 col-md-4 bg-light py-3">
          <h1>Comfort</h1>
          <p className="lead">
            Pamper your feline friend with the luxurious comfort of our
            scratching posts. Covered in soft, plush fabric, they offer a cozy
            retreat for your cat to relax and unwind.
          </p>
        </div>
        <div className="col-12 col-md-4 bg-light py-3">
          <h1>Design</h1>
          <p className="lead">
            Engage your cat's natural instincts and keep them entertained for
            hours with our interactive scratching posts. Featuring built-in toys
            and enticing textures, they stimulate your cat's senses and
            encourage active play.
          </p>
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-12py-3">
          <p className="fs-1">
            Empower Your Coding Journey with Every Scratch – Get Your Paws on
            Our Purr-fect Scratchers Today!
          </p>
        </div>
      </div>
    </div>
  );
};
