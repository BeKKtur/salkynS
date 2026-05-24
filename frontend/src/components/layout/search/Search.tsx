"use client";
import { useEffect, useState } from "react";
import scss from "./search.module.scss";
import { FiShoppingCart } from "react-icons/fi";
import { useGetProducts } from "@/hooks/useGetProducts";

interface SearchProps {
  search: string;
  setSearch: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
}

export default function Search({
  search,
  setSearch,
  category,
  setCategory,
}: SearchProps) {
  return (
    <div className={scss.container}>
      <div className="container">
        <div className={scss.mainContainer}>
          <select
            className={scss.select}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="default" disabled>
              Категории
            </option>
            <option value="fridge">Холодильник</option>
            <option value="ac">Кондиционер</option>
            <option value="microwave">микроволновка</option>
            <option value="tv">телевизор</option>
          </select>
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
          <div className={scss.cart}>
            <button>
              <span>
                <FiShoppingCart />
              </span>
              Корзина
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
