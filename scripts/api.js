let base_url="http://localhost:5000";
    $(document).ready(function () {
        $.ajax({
            url: base_url+"/category",
            type: "GET",
            success: function(response) {
                let categories=response.data.categories;
           
                if(categories.length==0){
                  $("#append-categories").html('<a class="dropdown-item" href="#" disabled>No category found</a>')
                    $("#category_id").html(`<option value="">No category found</option>`)
                }else{
                  let appendCategory=categories.map((el)=>{
                    return `<a class="dropdown-item" href="/products.html?category=${el._id}">${el.name}</a>`;
                  });
                  let appendCategoriesInDropDown=categories.map((el)=>{
                    return `<option value="${el._id}">${el.name}</option>`;
                  });
                  $("#category_id").html(appendCategoriesInDropDown)
                  $("#append-categories").html(appendCategory);
                }
            },
            error: function(response) {
    
            },
          })
          //for main page 
          $.ajax({
            url: base_url+"/brand",
            type: "GET",
            success: function(response) {
                let brands=response.data.brands;
           
                if(brands.length==0){
                    $("#brand_id").html(`<option value="">No brand found</option>`)
                }else{
                  let appendbrandsInDropDown=brands.map((el)=>{
                    return `<option value="${el._id}">${el.name}</option>`;
                  });
                  $("#brand_id").html(appendbrandsInDropDown)
                }
            },
            error: function(response) {
    
            },
          })
          var urlParams = new URLSearchParams(window.location.search);
          let name=urlParams.get('name');
            
            $.ajax({
              url: base_url+"/product",
              type: "GET",
              data:{
                name
              },
              success: function(response) {
                  let products=response.data.products;
                  if(products.length==0){
                    $("#append-main-products").html('<div class="col-12 text-center"><h4>No Product found!</h4></div>')
                  
                  }else{
                    let appendProducts=products.map((el)=>{
                      return `<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12"> <a href="./product-detail.html?product_id=${el._id}" class="text-decoration-none text-dark" > <img src="${base_url+"/"+el.images[0]}" alt="${el.images[0]}" width="100%" /><p class="text-center">${el.name}</p><h2 class="text-center">Rs${el.price}</h2></a><div class="text-center"><button type="button" class="btn btn-danger button-product">ADD TO CART</button></div></div>`;
                    });
                    
                    $("#append-main-products").html(appendProducts);
                  }
              },
              error: function(response) {
      
              },
            })
        if(window.location.pathname.toLowerCase()=="/products.html"){
            var urlParams = new URLSearchParams(window.location.search);
            let category=urlParams.get('category');
            
            $.ajax({
              url: base_url+"/product",
              type: "GET",
              data:{
                category_id:category,
                brand_id:urlParams.get('brand'),
              },
              success: function(response) {
                  let products=response.data.products;
                  let brands=response.data.brands;
                  console.log({brands});
                  if(products.length==0){
                    $("#append-products").html('<div class="col-12 text-center"><h4>No Product found!</h4></div>')
                    $("#append-brands").html(`<div class="col-6"><p>N/A</p></div>`);
                  
                  }else{
                    let appendProducts=products.map((el)=>{
                      return `<div class="col-lg-3 col-md-4 col-sm-6 col-xs-12"> <a href="./product-detail.html?product_id=${el._id}" class="text-decoration-none text-dark" > <img src="${base_url+"/"+el.images[0]}" alt="${el.images[0]}" width="100%" /><p class="text-center">${el.name}</p><h2 class="text-center">Rs${el.price}</h2></a><div class="text-center"><button type="button" class="btn btn-danger button-product">ADD TO CART</button></div></div>`;
                    });
                    let appendBrands=brands.map((el)=>{
                      return `<div class="col-6"><a href="/products.html?category=${category}&brand=${el._id}">${el.name}</a></div>`;
                    })
                    $("#append-products").html(appendProducts);
                    $("#append-brands").html(appendBrands);
                  }
                  console.log({products});
              },
              error: function(response) {
      
              },
            })
        }
        if(window.location.pathname.toLowerCase()=="/product-detail.html"){
            var urlParams = new URLSearchParams(window.location.search);
            let product_id=urlParams.get('product_id');
            
            $.ajax({
              url: `${base_url}/product/${product_id}`,
              type: "GET",
              success: function(response) {
                  let product=response.data.product;
                  if(!product){
                    $("#append-product").html('<h4>No Product found!</h4>');
                  
                  }else{ 
                    $("#append-product").html(`<div class="col-lg-6 col-xs-12">
                    <img src="${base_url}/${product.images[0]}" class="p-4" alt="" width="100%" />
                  </div>
                  <div class="col-lg-6 col-xs-12 pt-5">
                    <p class="product-title pt-4">
                    ${product.name}
                    </p>
                    <p class>
                    ${product.description}
                    </p>
                    <p class="price">Rs${product.price}</p>
                    <p>Delivery (KHI & LHR) - Same day (if ordered before 11 am)</p>
                    <p>Delivery (other cities) - 24 to 72 Hours</p>
                    <p>Warranty - 03 months</p>
                    <button type="button" class="btn btn-danger button-product">
                      ADD TO CART
                    </button>
                  </div>`);
                  }
              },
              error: function(response) {
      
              },
            })
        }
        if(window.location.pathname.toLowerCase()=="/signin.html"){
            $(".login-btn").click(function () {
                let email= $("#email").val();
                let password= $("#password").val();
                $.ajax({
                    url: `${base_url}/user/login`,
                    type: "POST",
                    data:{
                        email,
                        password,
                    },
                    success: function(response) {
                        localStorage.setItem("user",JSON.stringify(response.data));
                        alert(response.message);

                        if(response.data.user.admin){
                            console.log("here");
                            window.location.href="/adminPage.html"
                        }else{
                            window.location.href="/";

                        }
                    },
                    error: function(response) {
                        alert(response.responseJSON.message)
                    },
                  })
            });
            $("#signup-form").submit(function(e){
                e.preventDefault();
                $.ajax({
                    url: `${base_url}/user/signup`,
                    type: "POST",
                    data:$("#signup-form").serialize(),
                    success: function(response) {
                        alert(response.message);
                        $("#signup-form").trigger("reset")
                    },
                    error: function(response) {
                        alert(response.responseJSON.message)
                    },
                  })
            });
            
        }
        let user=JSON.parse(localStorage.getItem("user"));
 
        if(user){
            if(window.location.pathname.toLowerCase()=="/signin.html"){
                window.location.href="/"
            }

            $("#loggedIn").show();
            $("#loggedIn").html(user.user.first_name);
            if(user.user.admin){
                $("#admin-dashboard").show()
            }else{
                if(window.location.pathname.toLowerCase().includes("adminpage")){
                    window.location.href="/"
                }
                $("#admin-dashboard").hide()
            }
            $("#login").hide();
        }else{
            if(window.location.pathname.toLowerCase().includes("adminpage")){
                window.location.href="/"
            }
            $("#loggedIn").hide();
            $("#login").show();
        }
        $("#logout").on("click",function(e){
            e.preventDefault();
            localStorage.removeItem("user");
            window.location.href="/";
        })
        
        $("#add-category").submit(function(e){
            e.preventDefault();
            $.ajax({
                url: `${base_url}/category`,
                type: "POST",
                headers: {"Authorization": `Bearer ${user.token}`},
                data:$("#add-category").serialize(),
                success: function(response) {
                    alert(response.message);
                    $("#add-category").trigger("reset")
                },
                error: function(response) {
                    alert(response.responseJSON.message)
                },
              })
        });
        $("#update-category").submit(function(e){
            e.preventDefault();
            var urlParams = new URLSearchParams(window.location.search);
            let category = urlParams.get("category_id");
            $.ajax({
                url: `${base_url}/category/${category}`,
                type: "PUT",
                headers: {"Authorization": `Bearer ${user.token}`},
                data:$("#update-category").serialize(),
                success: function(response) {
                    alert(response.message);
                    window.location.reload();
                },
                error: function(response) {
                    alert(response.responseJSON.message)
                },
              })
        });
        $("#add-brand").submit(function(e){
            e.preventDefault();
            $.ajax({
                url: `${base_url}/brand`,
                type: "POST",
                headers: {"Authorization": `Bearer ${user.token}`},
                data:$("#add-brand").serialize(),
                success: function(response) {
                    alert(response.message);
                    $("#add-brand").trigger("reset")
                },
                error: function(response) {
                    alert(response.responseJSON.message)
                },
              })
        });
        $("#update-brand").submit(function(e){
            e.preventDefault();
            var urlParams = new URLSearchParams(window.location.search);
            let brand = urlParams.get("brand_id");
            $.ajax({
                url: `${base_url}/brand/${brand}`,
                type: "PUT",
                headers: {"Authorization": `Bearer ${user.token}`},
                data:$("#update-brand").serialize(),
                success: function(response) {
                    alert(response.message);
                    window.location.reload();
                },
                error: function(response) {
                    alert(response.responseJSON.message)
                },
              })
        });
         $("#add-product").submit(function(e){
            e.preventDefault();
            let fd=new FormData(document.getElementById("add-product"));
            $.ajax({
                url: `${base_url}/product`,
                type: "POST",
                headers: {"Authorization": `Bearer ${user.token}`},
                processData: false,
                contentType: false,
                data:fd,
                success: function(response) {
                    alert(response.message);
                    $("#add-product").trigger("reset")
                },
                error: function(response) {
                    alert(response.responseJSON.message)
                },
              })
        });
         $("#update-product").submit(function(e){
            e.preventDefault();
            var urlParams = new URLSearchParams(window.location.search);
            let product = urlParams.get("product_id");
            let fd=new FormData(document.getElementById("update-product"));
            $.ajax({
                url: `${base_url}/product/${product}`,
                type: "PUT",
                headers: {"Authorization": `Bearer ${user.token}`},
                processData: false,
                contentType: false,
                data:fd,
                success: function(response) {
                    alert(response.message);
                    window.location.reload();
                },
                error: function(response) {
                    alert(response.responseJSON.message)
                },
              })
        });
          $.ajax({
            url: base_url+"/category",
            type: "GET",
            success: function(response) {
                let categories=response.data.categories;
                if(categories.length==0){
        
                }else{
                    let appendInTable=categories.map((el,index)=>{
                        return `<tr>
                        <td>${index+1}</td>
                        <td>${el.name}</td>
                        <td> <a href="" class="delete-category" title="Delete" data-id="${el._id}">Delete </a> <a href="/adminPage-update-category.html?category_id=${el._id}"  title="Update" >Update</a></td>
                      </tr>`
                      });
                      $("#append-category_table").html(appendInTable);
                      $("#category_table").DataTable({})
                }
            },
            error: function(response) {
    
            },
          });
          $.ajax({
            url: base_url+"/brand",
            type: "GET",
            success: function(response) {
                let brands=response.data.brands;
                if(brands.length==0){
        
                }else{
                    let appendInTable=brands.map((el,index)=>{
                        return `<tr>
                        <td>${index+1}</td>
                        <td>${el.name}</td>
                        <td>${el.category.name}</td>
                        <td> <a href="" class="delete-brand" title="Delete" data-id="${el._id}">Delete </a> <a href="/adminPage-update-brand.html?brand_id=${el._id}"  title="Update" >Update</a></td>

                      </tr>`
                      });
                      $("#append-brand_table").html(appendInTable);
                      $("#brand_table").DataTable({})
                }
            },
            error: function(response) {
    
            },
          });
          $.ajax({
            url: base_url+"/product",
            type: "GET",
            success: function(response) {
                let products=response.data.products;
                if(products.length==0){
        
                }else{
                    let appendInTable=products.map((el,index)=>{
                        return `<tr>
                        <td>${index+1}</td>
                        <td>${el.name}</td>
                        <td>${el.description}</td>
                        <td>${el.price}</td>
                        <td>${el.brand.name}</td>
                        <td> <img src="${base_url}/${el.images[0]}" style="width:100px"> </td>
                        <td> <a href="" class="delete-product" title="Delete" data-id="${el._id}">Delete </a> <a href="/adminPage-update-product.html?product_id=${el._id}"  title="Update" >Update</a> </td>
                      </tr>`
                      });
                      $("#append-product_table").html(appendInTable);
                      $("#product_table").DataTable({})
                }
            },
            error: function(response) {
    
            },
          });

          $(document).on("click",".delete-category", function(e){
            e.preventDefault();
            let id=$(this).data("id");
            $.ajax({
                url: base_url+`/category/${id}`,
                type: "DELETE",
                headers: {"Authorization": `Bearer ${user.token}`},
                success: function(response) {
                    alert(response.message);
                    window.location.reload();
                },
                error: function(response) {
                    alert(response.responseJSON.message)

        
                },
              });
          });
          $(document).on("click",".delete-brand", function(e){
            e.preventDefault();
            let id=$(this).data("id");
            $.ajax({
                url: base_url+`/brand/${id}`,
                type: "DELETE",
                headers: {"Authorization": `Bearer ${user.token}`},
                success: function(response) {
                    alert(response.message);
                    window.location.reload();
                },
                error: function(response) {
                    alert(response.responseJSON.message)

        
                },
              });
          });
          $(document).on("click",".delete-product", function(e){
            e.preventDefault();
            let id=$(this).data("id");
            $.ajax({
                url: base_url+`/product/${id}`,
                type: "DELETE",
                headers: {"Authorization": `Bearer ${user.token}`},
                success: function(response) {
                    alert(response.message);
                    window.location.reload();
                },
                error: function(response) {
                    alert(response.responseJSON.message)

        
                },
              });
          });

    });