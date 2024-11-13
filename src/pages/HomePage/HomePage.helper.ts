import { UserType } from "../RegisterPage/RegisterPage.props"

export const carouselImages = [
    "https://th.bing.com/th/id/R.42274ae040c301e4c1125aa18c0beefb?rik=7JxGSMB1j6Msmg&pid=ImgRaw&r=0",
    "https://cdn.smartstuff.howstuffworks.com/smartstuffhowstuffworks/wp-content/uploads/2021/03/smartstuff-handyman.jpg",
    "https://drpipe.ca/wp-content/uploads/2023/07/prepare-swimming-pool-1024x683.jpg",
    "https://th.bing.com/th/id/OIP.kHg9Yd1XDYlRTVdu0chkDwHaE8?rs=1&pid=ImgDetMain"
]

export const employeeCards = [
{
    image: "https://th.bing.com/th/id/OIP.A1SFIUszIMP_cmVbW3GOeAHaE7?w=248&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    title: "Register yourself like individual",
    type: UserType.IndividualEmployee
},
{
    image: "https://th.bing.com/th/id/OIP.uF5NZ8-FFWZfpNF2u33dygHaEW?w=570&h=335&rs=1&pid=ImgDetMain",
    title: "Register yourself like business",
    type: UserType.BusinessEmployee
},
{
    image: "https://cnectgpo.com/wp-content/uploads/2023/11/become-a-member-header-image_Compressed.jpg",
    title: "Register yourself like customer",
    type: UserType.Customer
}
]