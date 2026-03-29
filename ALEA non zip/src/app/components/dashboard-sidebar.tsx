import * as React from "react"

import {
  CalendarDays,
  LayoutDashboard,
  Settings,
  CalendarRange,
  LayoutGrid,
  LogOut,
  UserCircle,
  ArrowRightCircle
} from "lucide-react"



import { Calendar } from "./ui/calendar"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "./ui/sidebar"

const gestionaleItems = [
  { title: "Dashboard", url: "#", icon: LayoutDashboard },
  { title: "Pianificazione", url: "#", icon: CalendarRange },
  { title: "Prenotazioni", url: "#", icon: CalendarDays },
  { title: "Gestione Sala", url: "#", icon: LayoutGrid },
  { title: "Impostazioni", url: "#", icon: Settings },
]

interface DashboardSidebarProps extends React.ComponentProps<typeof Sidebar> {
  pastShiftsStatus?: { date: Date; status: string }[];
  selectedDate?: string;
  onSelectDate?: (date: string) => void;
  activeView?: string;
  onViewChange?: (view: string) => void;
  onLogout?: () => void;
  appRole?: string;
  userEmail?: string;
}

export function DashboardSidebar({ pastShiftsStatus = [], selectedDate, onSelectDate, activeView = "Dashboard", onViewChange, onLogout, appRole, userEmail, ...props }: DashboardSidebarProps) {

  const currentDateObj = selectedDate ? new Date(selectedDate + 'T12:00:00') : new Date();

  const handleDateSelect = (date: Date | undefined) => {
    if (date && onSelectDate) {
      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, '0');
      const dd = String(date.getDate()).padStart(2, '0');
      onSelectDate(`${yyyy}-${mm}-${dd}`);
    }
  };

  const missingOneDates = pastShiftsStatus.filter(s => s.status === 'missing_one').map(s => s.date);
  const missingBothDates = pastShiftsStatus.filter(s => s.status === 'missing_both').map(s => s.date);

  // Usa le voci del gestionale (tutte le sezioni)
  const items = gestionaleItems;

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="mb-6 mt-4 h-auto hover:bg-transparent" asChild>
              <a href="#" className="flex items-center gap-4">
                <div className="flex aspect-square size-12 items-center justify-center rounded-xl bg-[#F4F1EA] p-2 shrink-0 shadow-md border border-[#EAE5DA]">
                  <img src="data:image/jpeg;base64,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AAgAAKACAAAAoAAIAACgAAgAAKAAACAAoAAAIACgAAgAAAKCAAAAAACRAAAAoAIAAAAAAAAACgAgAAAAKCAAAAAoIAAAACggAAKAACAAAoAAIAAACgAAgAAKAACAAAAoAIAACgAAgAAKAACAAoAAAIACgAAAgKAAAAAAAAAACAAoAAAAICgAAAgAAKAAACAAoAIAAACgAgAAAKCAAAAAoAIAAAACgAgAAKAACAAAAoAIAAACggAAAKCAAAAAoAAIAACgAAgAAAKACAAAAAAAAAAoAIAAAACgAgKAAAAAAAAAAAAAAAACAAoAAAIACgAAAAAgKAAACAAoAAAAICgAAgAKAACAAAoAIACggKAAACAoIACggKACAAAoAAICgAAAgH//xAAC/9oADAMBAAIAAwAAACGEEEEEEEFX30EEMMEEEEEEEEEEEEEEEEEEEEV333nH333j3333nX33zzw000000AE00wEEEE00EX3333nCT233zxx2gDCQ30CA5yxzCCBz332HDzX33jDD300kDTz333zzz3mQw3333wzz3321333320w33332wz333mQ13330kF3332ET333wwz33HbzTz33Hyz33nHywx3nGwAX33nDAR33nGwz3wgbzDywxb6wwgQpJywEBL7DT2ER7wzmEBSxy1jBb7z30ET3332xz3330wA1333zw3333kQ1330FRz333kU33323jX33mDDz333kBT33HWzz3333z23333iTz3333z3330jDzywQ4xzmAYrbz3mwxzzn2xzzz3zxzzAHEALzzzmFb7yz2DDy130ADzz3mADzz333DDDV3DTTj32kATz332TTz320EX3332013333wz33330yIEEEX3nHX32Q33333zz3333Hz3HAYwx3nMYhDzHXzyzZUgBzzz3ziwwz320zDD30wxzz3Bzzz33yzzz32kDTzEZvIcCAA4tfSwzwBDDxy0gBLK300z33333zz3333AT30GprM8klsso7FHkww3332jT3333nT33334w3333jT33336oie8iqoaJGMSwx33n2xz3330xwXwxwwxyww47z3333xIIO+cAZoh4urzj3wzzzxznCx6wznDT3332wx33333mEIqEP4YEBrphUuoFXwz330kBz1331T3333HDD3333y0FVBoNPikEE9rxfN84gEH33DD3333mDz20Y4zznMY4x3kEbfAAOuAII+qqtSdmgBzzxD3307LTz2wzjT30AL7/32FkfoMG+sIAEW/RxuK6IDzzn30wjDz23HT333mEF33330Ft4EEOIoEEEW/qIIIYADW0X2wx33333z33Uywz33HTzzx/IMJTyEEgBzAsI4IMAF33B7z330ywhHDDDLX2wDDTz2MIAAANsQAAEEBA9d7cgDzgD30xDzz03GAz3333yz32nlcAEEXOAAAEEEAAEFN44hHX32kQx333Ez333HAD3333T9YUMFt4AEEEAQAEEFQ6uAX3+5D33nXzDTypLbz3nTzwBfZ/vguIAwwygAAAAJI9KsjzywzDzywwz2AT3330wzzHN/OwVYsEABAEEEva48uR3ar3330lz333nH3332kU33k0ZqNH0EEAAEEFG8aN86B9L7rnnXz3333HEz32wwgT3n1JDwpraNPs4orrc5aw7DLN81U/QBTz057iD3zDTz32zSrJDmYsYMLI44p6K4DrLKJKIb6fjW0wDSx2nEV3333Ezm9RDptLn2tNOJLBeBCIAAIYf6Jc9H303332jz33244z3pLD6PHHEEEEEEEBCmgAAcLIFEf7qLz332Awz3CBz7zzzIIIukEEEEEEEEEEHCOJotCAAFNboLn457wz30x33333papoIEEEEEEX20EEEEEEEEEEEFHuI4v33333kD33nPDS4I7eAEEEE1333002000kEEEEEEEdr/APV99zIA0s8++iCaCSKAJBN984wtd888c99tMNNBBNIyiG6Ee+gA9oENd95veKiBd919999pMM9995AEd99995BXqX2uPd99BV995xxphDBdNBd999989999xg999hF899JBjz99999osd9sM809999qw99888sM95yykc9xwc8N990sN99986MA9oA0899988999hE8+99tAC8995088895w88899888999xw1995x9t5d998899999999994A9999NM9999989995hEd9zgMM995wAMd9xxww89518KM95xxME9xz4yw1998sM9xAGe+5BAU8898sO8888Ec8895888889sOO89NNM8OMNxww9995w89999899999ggd999pU899988sd999Mc999JIV95xEJd99x8sc9198AU95x18s9999BB99xxAw995x94Q9MMM88888M488oM48899s88895AAMc8w9c84Axx04kc89Ac89988A99988hhAd8888hAf8AwH4AAQYfPnAYgPPPff/EAAL/2gAMAwEAAgADAAAAEIwww04ww1w/wwwQTwxzzy017ywwzz/ywwwwx207xz16wxk84wx+4wwgkhzzzwxwozyzk8wwzzwx8888xzmg0wwgoo1vjmsw/nsIkojnnog043zgi885jjgw89/iggwwwgggx2sswwwwsggww04wwww08swwww0sgwwx2s4www9/4www3+gwwwssgwzyAiggwzwkgwxzwksoxz0vuwwxzjuowxz0sgwtuAjgksqAEstutLIkv/rADig3+oAsh3/qkok5jqAAgw/+gwww0ogwww8vs4wwwgswwwx+s4ww/wCqIMMMfvMMMNMYsMMd44IMMMf6oMM8tIIMMMMINMMMMZoIMMMMIMMMPY4IJLrDKId7jQgIMdLKIJv96IIIMIKII78/7wIIId+gAJIN44JOMP74IIMd74IIMPlrDAWs4ooYMNf7oIMMNooIMNP/ALDDDDTzjDDDCyDDDDfe71pBF/JBWjDazDTDDCCDDDDPCDPO4yyjHN42uCPLGuKe8qAc88/46ayyDDTyOODDyyiCDOiCCDDCSCCDDX+KCzAuGmGgAFKa26yC+uOCiT2+sMTDzyDDDDDCCDDDDO6DXTa314zzONh3xZHyyzDDDWKDDDDHKDDDDAyzDDDGKDDDXh3KVJO+Cd7Sdm+yjDHDSiDDDDyi7CyiyyiSywwCDDDX4z3tdZGfR58K2X4LCyCCCiHOSgSyHOKDDDDSyjDDDH7hUHrxDDbHCyZMwfdXO+DDD3+iDjDDqDDDDPOODDDDCPBVUoxRJ3rHeHdtnaTIBBpDOODDDDHeCDT4wyCHN4wyj5BXu6Cx+qAA8j3ngX9IAcgKuDDDwMKCDSyGKDD+8ABDXhJGMtD8XAGLLDQdIkBQA405LDy2OCDTPKDDDHf/AIwww/wwJGc0e6D/APvWgOFGEYIDWDWNLKMMMMMIMMvJLIMM8oL7yKSEAJkMMgByRQk9c8AF8N6AIMMPJLa8444wsNL44pb2jsLI4CMYAAEEBL2qF8gL6b4MPK4IIPM97IMMMMJIMeuvap//ALmCAE94hACHdYeZITnDDX6yjDDPyDDDPO+DDDXkFk75L03CNxxAEAT/AM5mr7BYwULgwxywjiglLCAgxyghhmLJj9cyAjDDKAAAggEFbYyKgksjggkssg3ugwww8sgtxchaibSDwgEDTVcJuHNUqSjLQww94gwwxzwwww1+8w227VbpQO8wgkXfG7iTj+lcRSm8bywgwwwzz8gw0stugx18jYeVVh39hRCcc37hT0ZjMxSSpvqgg8IBngwjiggw0iqEzWJAaDD/AFHVtFs8HvPONMN/6/CNPL4pKNc/uMMMM/IO/iXssxeuRDhGxp+FGM3y9k0l7uRsMPMMMNYIMMNDDIOxMEvBX0nEEFHGEDY2kHEYagMEZ7eEoMMN7LIM56IAIIKYMOdMkEEUAEEEEUGDCZZnKABHSUWPsDCALIMPKMMMMMS+uGSMEExzwf8AvH88pBDPPc4hBF9OHwLDDHDH+DDHNOK71BtCBBQw/bzDXPPrNN5xwgBBU4gFAjbDDN2+KSCAAcovjjqALDP/AMhjk4wggos85zjzQQTyp032+oAHvg1us4wx/wCMswNPMsMMMNfLIMMMf7qMNPf3sHSAcBDGMMP+sMMc8+Pf3NvP+MMMMMIMMMM94MMN/sINNqOlEMMMMNZKMNLIIpfv/wD0ODDCCCSyDHMMaiDPOiCzDDKmPzDDCEy+DW+KCDDDCC/DDf6CADDT+8CDDHKCCCDHOCCCDDCCCDDDPOLDDHPDXLTDDCCDDDDDDDDDDG+DDDDzyDDDDDCDDDHf6jDNeyyDD3O+yjDPPOOCDHLC0yDHPPy6DPNGMOLDDCSyDP8AuIAB/wD6oIIMJLAIIILqIIIMcIIIIINLDAIPPPILDLM844MMMc4IMMMMIMMMMN56MMMNeoIcMMIJKMMMPKIMMPfasMc/reMMM8JKIMsML6oMc8sJIMMMP/8ADDPP+ODDHPDGuDyyyCCCCCyGCCWyGCCDDSCCCDH++yiCODiCG+PPKGaiCj+iCDDCC+DDDCCff+jCCCCf+hB+he+//fCAi/c+CCDf/8QAIxEAAgEDBAIDAQAAAAAAAAAAAAERECExAiBAQTBRElBhgP/aAAgBAgEBPwD+oIf1ahkyo+rViBq+2PpESxXQ9iRpY19IzT2OkEWNMn6IefoUdN0XZFkTA1YWB2uQmhSm0Z+hiw2sUSyO0VbhkShSlV2fPQpiSKdI1UThjUqDqiFKcDuo56VoG6QehuW6RRtISF6M01YnmpdnVVSKp3GpReDrZHMiyRNdI8bFTsmqNWeWhtwJbHt07UPL5cbMvwZ2dPlr2TbYsSPG9ElqLvlRJbb2PxJkj5KVhwqQ6L2Ofj48UtgiORPtEfKr/aN+RYo1YXG0qj0+iW6STbeiERpIVME0ka4qyOlkN+GJESui9I/KQujqjVhcRKNlvRGkhEL2QvZ8WQz4sWljonsnbHfDWTLGI0YeyaTWSTO9dnVe+ErISHWUSiUSvRP4T+HyJZIofgbgTq78FHY3TU+vGrC3N+q9Kr4CxwZJRKJ/BudidYledImrvyn5uqt7Y4emqHnyurzyEOr68qq+SnSB3fmQ3y1/Sn//xAAoEQACAgAEBgMBAQEBAAAAAAABAgARAxASIRMgMEBBUTEyUCKAI2H/2gAIAQMBAT8A/wBlgEkR1oZV+ThjyYDdyvyQLIjkAUJh+Y/2PJpJW4hoxxR/Dwx5MY2Zh/aYn2zKjSCIh3qONLT7L+EosgRzp2ywvvMT7QfMcWLmGd6hXS0P9LENGYi1uPwU23jGzeWH9o+7ZYZsESqMbcXMNt6mItGKdSQij34FkCYjAbDPB+TGNsclNGONrmE3iONLQnUsU0Ywsd+goXG3N5pst8iG1qUVaNuIh3qOpG8U2Iy0eWu4RdTATFIFAcjbJyIaMcTDN7R1prEosIAFhFjvU/kXCbJOaizMQ/A5LiNawKQ20qXkJ5PdoNTTFNUOTCGxMY2TyoaP4Kfytw7m+Q0q86uCOR9l7tF1NMQ70OTDFtHO/QDmDEGT7juwNC3CeQAKnTRvEqOtN3KLZv1MRrNciLbTEO9dRTYjLY7lWKzcmUEFmB0PiFAfiKulbMJs9TDbesnG99tcQWbhAMKEQnIMRGex0AjGcM+5w4UbIQGxKsQgg1L7SooAUDIvUPRAgUL8w4p8S8Qz/oIHfyJatGQgXMJvGTi9+1QecrqKNTThD3OHOGfc4bTQ00t6mlvUo+jApiKFht2rxAoGdTSINow0tYzddJ7QCgBDG+sw/nMjOsryqChz4nxcwzYIyYWOzQec8U7ARHCjcTif+TiH1OKfU4jTW01t7hZvcs+4GYeYr6pXPiG9hFNEGXk61v2IBJlUKzc2emLBsQODnUqEgRsS/jPD3EqfIqEUa7BB5zdqHWDsJxD6nEPqF2PKho5uL366izUqsiQBC1nsb5la1yqOtHrYY2uXKjnxK7dDRzcWOsPgZ+e5U2oMvJvseqr1tAR4MJAl9yj1LELACXf+kxzDvfPQ/8QAQhAAAQMBBAUIBggGAwEBAAAAAQIDBAAFESExEBITQXEUICIyQlBRgTBAUmGRsRUzYGJykqHRIzRDRFOCJKDBVGP/2gAIAQEAAT8C/wC1g9LZZcaQs4ry+y6iACTU2QZEhbm7s8KsyVyiMm/rJwP2WtmVs2dkk9Jfy0WM9qStTcsXfZVaghJUcgKkvqkPrcO/LhobcLbiVjMG+kqC0pUN4v8AspbUrVQGBmrrcNC4GrZm2I6d4PlospzXhN/d6PozIYS5sy4nW8L/ALEOLShClKyAqQ8p95bh3moEblElKdwxVwqS3rxnUeKDosJfQeR7wfRzm1Ny3gr2r7+NWXM5QzqqPTRnw+w9tS7gGE78VaLKi7GPrEdJeJoinE6rrifBRqw13SVp8UfL0FrOOtxL2zd0hefdVlzlNv6i1nUX47jotmLrtB4Zoz4VFfVGeS4PPhSFpcQlaciMPsK66lptS1ZAU86p51bis1GrNi8oki/qpxVpnJ1ZsgfeqyTdOa99/Ol2w41IUhtAuScb6jvofZS4nfTzaXW1oVkRdTjamnFIVmk3VZkrlEcX9dOCqUkKBByNSmDHfW34ZcKsWXcTHUfej9vsLbcrEMJPvVosyNsIwv6y8TptQf8APe8qs3Ccx+LS44htBWs3AVGnxpCilCsfA6LaY1Hw6Ml/MVY0rUe2JPRXlx0W1FxS+OCqgSuTSArsnBVXgi8VbMbXaDwGKM+FJUpKgoHEHCockSWEr39rj9g5DyWWluK3CnHFOLUtWZN9WXG28kX9VGJ5lrfz7nAVA/nY/wCPTabRdhuAZjH4U08pp1DicwaacS62laclC+p0blEZaN+aeNC9J8CKgyRJjpXvyVxp9pLzS21ZEU4hTa1IVmDcasaXtG9io9JGXClAKBBqXHMeQtvdu4VZkvk79yuovA/YO2pOssMDdirRZ0Xk8ZIPWOKuZah/573lVm/zrH4uZOY2EpxG6+8cDViSc46uKdFrRtlJ1h1V4+dWXL2Ei4noLwOi2o1y0vjfgqo7ymHkOJ3Gm1pcQlaciL6teLtGNoB0kfLRZMvbM7NR6aP1H2BlPpjsLcO6lLK1KUrMm81ZMXbSNYjoox8+baBvnSPxVZWM5rz5ltx9ZpLwzRnwptxTbiVpzBph5LzSHE7xVpR9vGUB1hinRZcvbx7j10YGpLCX2VtneKWhSFFKswbjViys46j70UReKmx+TyFo3Zp4VGfVHeS4nd8qbcS4hK05EfYC2ZWu6GRkjPjQqBG5PGSntZq481860h4/fNWIm+WT4IPMcQlxCkHIi6nWy06ts5pN1WLKuWWFHPFPHRaUfYSleyrpCoEnk8hKuycFcKFW1G1Vh8DBWCuNIWpC0qTmDhUV9MhhDg358atiNtGNoB0kfLRY0y5XJ1HA9Xv+ZIEeOtz4caUSSSczVkRdq/rkdFHz5rh1UKPgKzxqwkYvq9wHNtuPctD434KpKihQUnMHCor4kMIcG/PjVqxttGJHWRiNFjytqzs1HpI+VSWQ+yts7xSklKik5g3GrHl7J7ZKPRX86IvFTY/J5C0bs08KBKSCDiKgyhJYC+1krj39a8rav7IdVHzoAkgDOocYR46G9+/jzbRc1ITx+7d8dFiIuiqV7S/lzZTAfYcb8RhxoggkHMVYsnUdLJyXlx0T4/J5K07s08KiyDHfQ4PPhSVJWkKBwIwq2o+o6HhkvPjos+VymOlXaGCqtiLtWNoB0kY+WizpXJnxf1FYK79nSeTR1L35J41ed9WNG2jxeI6KMuPOtxy6OhHtL+VX1ZyNSEwPu3/HnWvH2UnXGTnzoEpIIzFQ5AkMIc37+NWxH2kfaDNHy0WLL1klhWYxTwqWwJDC2/EYcaIIJBzGdWbK5PIF/UVgqrrxU6NyeQpPZOKeGiyJe1a2Sj0kZe8d+WtK20jVB6KMPOkpKlBIzNRGBHYQ2N2fHnW45fIQj2U/OkJ1lpT4m6kjVAHgOdaUfbxVXdZOI0WRK2T+zJ6K/nSgCCDUtgsSFt+GXCmXVMuocTmk004l1tK05KF9WxF2bwdGS8+OiyZe2Y1FHpo+VWvG2sfWHWRj5aGH1sOocTmKadS62hxOSh31aMnk8ZRHWOCdFixdZwvnJPV48+Y7tZTy/vfKrLa2k1r3Y/D0FosbCUsdk9JOiBJ5RHSrtDBXGrajazQeGaM+GixZVxMdRzxTUyOJEdaPhxo3gkHOoslcd5LifMeIqRbLBZIaB1iN+7TYkq5RYO/FPfVpytvJN3VRgKbQpxaUJzJuqOylhlDY3DnS3dlGdX4J0WE19c7/AKj0FsRtrG1x1m8fLRZMnYydUnorwNLQFpUk5EXGpDJYeW2dxpK1IUlScwcKjSUSGEuA8fcatDUMx4oyv5rLhadQsZpN9JIUkKG8X98WpK2Ec3ddeA0WLGvJfO7BPPtx65lDXtH5aLMa2UJobz0j5+gIBF1S2NhIW34HDhos6VyiMknrDBVW5H6KXxuwOgEjInn2YvXgs+4XfDvi0JPKJKj2Rgmmm1OuJQnMmmGkstIbTkkc+1HtrMX4I6NMNF15tHtKoC4XD0Ntx9ZtLw7OB4aIkx2K5rJxBzHjU20nJSQjU1U+HobH/kUfiV3va0nYx9UHpLwGixIucg8E8+Q6GWXHDuFEkkk5mrEZ1n1OewP1PonEBxCkKyIup5pTLq21ZpN3o7MRqwWOF/x72yqdJ5TIUvdknhTDKnnUNp3mm20ttpQnIC7n24/c2hkdo3ny0WWxsoiPFfSPo7bi9WQngr0TaC4tKB2jdSEhCUpGQF3e1sStkxsgekv5aLFi6qC+rNWCeHoJ7+3lOK3DAeVRGS/Ibb8TjwoYYejcbS4hSFZEVJjrjvKbVuy949DYzWvL1vYF/eyiEgk5CpcgyH1ufDhUVhUh9DY358KQkJSEjIDDn2lI2EVZ3nAeeiw2PrHz+EelnQkSm7slDqmnmXWVlDibj6Cwk9F9XvA72tmVqNBhOa8+Gixouza2yhivLh6C2X9pIDYyR8zQSSQBnUZkMMNt+A/X0zzDTyNVxAIqTYjgxYVePZOdOMPNG5xtSePOsJf16OB71WtKEKUrIC+pD6n3luHef0qFGMiQhG7tcKAAAA577oZaW4eyKKytSlHMm81ZEfaydc5N4+fqTsCG71mU+WFSLD3sL/1VTja21FK0kHw02c/sJbZOR6J8+9bblXJDCTnirhosiLsmNc9Zfy9BbkjBDA34q0WZH2EVN/WV0j6pMhtym7j1uyrwpxC21qQsXEHHTZcvbsXKPTRge83XEtNrWrJIvp51Tzq3FZqNWfG5RJSnsjFXoFqCUlRyAp94vvLcPaNWfH5RKQncMVerW1FwD6RlgrTDkmM+lzd2uFJUFJCgcCMO8ral5R08VaLKi7COCR0l4n0FtSNRkNDNefDRY0fZx9oc3Pl6s62lxtSDkRdTrZacWhWaTdpsWXeOTqOWKP27xfdSy0txWQFOOKdcW4rNRvqzY3KJIv6qcVaVutt9daU8TX0hCv8A5hHxpK0LF6VAj3aSbhealyDIkLc+HCokcyH0N+Jx4UAAABkPV7bj3LQ8N+B0trU2tK0nEG8VGfS+yhwb/n3hLjJksltRIqVAkRj0hen2hVmxeTxhf1lYq0T7X1SWmM96/wBqKlLVrKN58TobcW0rWQopPuqLbZGEgf7Cm3W3U6zawoe6rYk7OPqA9JzDy0WLG1Gi8c15cPWJbAfYW2d4/WiCkkHMabJmbF7ZqPQX+h7vkPpYZU4rIVGmx5I6CsfZOem1pZYY1U9Zfy0QrNdk9InVR4+PCvoOLq9Zy/xvqTZEhrFH8QfroZedZVrNrKTUmS5Jc1153XVGYL7yGxvNJSEpCRkBcPWbYj7ORtBkv58yzJfKGLiemjA/v3dbMrXdDKckZ8avIN4qLbLrfReGunx30xJZfTrNrBpxpt1OqtIUKVYadsClz+HfiDnSUhKQkC4DTJgx5PXTj7QzqVZchjFPTR7s9FixtVBfPawTw9RJAzN1cojj+sj81CQwcnkfGgQcjzrRj7eKtO8Yp4jmQ5JjPpc3doe6kkKSFA4HLuyW+I7C3D5caJKiScycdKFrbVrIUQfEVDtm8hEj8/78+TZkaQb7tVXiKQlKEpSnIC4emcdbaTrLUEj30/biRgw3f95VO2lNdzeI/DhSiVdYk8auHhVw8KF4ywpudMb6r6/PH50zbjw+tbCveMKYtKI/gF3K8FYcy04+wlKu6qukOZYsu8cnVuxR+3dlsStq9sh1UfPmioaC3FZSrMJ9UnWk3FGqOk54fvT0h19es4q8/LQxZst7EI1R4qwpFgjtvn/UV9BxPac+NfQcT2nPjS7BHYfPmKdsia3kkL/CaUlSDcpJB9+iNaMmPgFayfZNRLRYk4A6q/ZOi1o22jaw6yMeYham1pWk4g3ioshMhlLg358e6p0nk0da9+SeNXk4nmQoS5TlwwSOsaYgRWLtVsX+0cT6paM0RW8PrD1R/wC0oqUoqUbyczUeO7Ic1Gxj8qh2YxHuJ6a/aP8A5S3ENi9awke+nLZhIyUV/hFKt4dmOfM19PO/4EfGhbzn/wA6fzUm3m+1HV5G+vpKzZA1XCOCxT1kMOjXiujhfeKejvMK1XEEUMKgWvk3IPBf71mKnR+TyVo3Zp4cyyZexf1FHoL+fdVrSttI1Aeij582zGQ1Db8VdI1IlsRtXaquvyoWrAP9cfA0LQhH+4R8aEqMcn2/zUHEHJafj6eXNaiovUeluTTzy3nFOLOJpppbziUIGJplmPBj5gDtK8al20tXRjjVHtHOlrWs3rUVH389ClIN6FFJ92FItRZRs5KA6j9aeYbuLkdesjeO0njosm0NUhh04dg+Huq22NdkOjNGfDm2XL5QxcrrowP790WjJ5PGUR1jgnmjEgU2nVQlPgAKttd8pKfZR89N3uq4UFKGSj8aD74yec/NQmzB/cOfGhac8f3B+AoWxP8A8gP+tC25ng2fKhbsjey3Qt5W+MPzULeRvjq+NC3I29twULag/fHlX0vA/wAv6Uu2YKclKVwFP228vBpGoPE4mlKUtRUokk7zos7ZRY65bu/BAqVLdkr1lnDcncPRpUpJvBuOmE6JcIa+OGqun2iy8ts9k8yHJMZ9Lm7tD3UlSVJCkm8HLue1JW3kEDqowHNho15TCfvjRPc2kx8/eu+HqrrynNQdlIuSPD09gqP8dHA1bkbqPj8KubY0z+3Ufej9u5rTlbCMbusrAc6xm9aZf7CSacVqNrV4Cr77z449yWCj69fAU+0l5lbZ7QpaVIUpKswbjzELUhSVJNxBvFRJCZDCHBvz49y2hK5RJUR1U4J51hNfwnXPE3fCrVc1ITn3sKu03jQG1nsK+FCPIOTLn5aEGYf7Zz4ULLnn+gfjQsef/jT+ahYkzxbHnQsORveb/WhYSt8kfloWEnfIV+WhYUfe65QsSH/+h86+h4H+M/mo2PBPYI4Gn7DUBey5f91VLQptRStJBG71Gz4/J4qEnrHFXnotqPqOpeGS8Dx5tlS9g/qKPQX+h7kteVsY+qnrLw58FrYxWke7HzqRFZkABwEgHxuoWVA/wfqaFnQR/booQ4oyYb/LQZaGTaPhVwG7082E3KbuOCh1VU42ttakLFxGfp7Ks+8h90YdgePv0zGBIjrb8RhxrEG482y5e3Y1VHpowP79xE3C+p0nlEhS92SeHOgMbeU2ndfefL1e0oHKUa6PrB+tEEG4j0gSVEAC8moNkXXOSPJH78214+yk646rmPnzYklUZ9Lg8x7qQtK0hSTeCMO4bYlbJjZpPSX8ufYsbUaLxzXlw9Yn2aiT00dFz506y6yvVcSUn0UWyZL2Kxs0+/P4VGhMRh/DTj7Rz51oxtvFUB1k4p51iy/7dXFH7dwKUEgk5CpcgyH1ufDhzosdUh9LY358KSlKEhIyAw9ZcabdTquICh76esNs4suavuVjTllTW/6Wt+E30pp1HWbWP9TpS06rqtrPAU3Zc5z+jd+LCmbC/wAr3kmmIcZj6tsA+O/0Npx9hKVd1VdIc1KlIUFJNxBvFRJKZLCXB5j3+v21K1Wwwk4rz4c+yoewZ11Dpr/QevXDwq4eHpbVjbaKSOsjEc6y5fJ37lHoLwP7+vOLShClKyAqQ8p95bh3/LnWTB2zm1WOgn9T3dOj8nkrRuzTwPOsmXtmdRR6aP1HrttSrkhhJzxVw50SMuS8G0+Z8BTbSGm0oQMB3dbMfXYDozb+XOjSFR3kuDdmPEU2tLiErScCLx6286lptS1ZAU66p51bis1HmgEkAZmrPhiKzd2z1j3epIUkg5GpLBYfW2dxw4c6xpdx5Oo54o/b1u2pN5DA4q51ixdZRfUMsE9423HvQl8dnBXDnBRSQRmMqiSBIYQ5458fWSbhTzhddcWd6udZyNSEyPu3/HvF1tLja0KyULqdbU04ttWaTdzrCX9c3wV6yoXginEFtakHMG7nQTfEY/AO8rbj3KQ+N/RVzrCH8V8/dHrVqWcXf4zXX3jxrHfzbO/kmPw95SGUvsrbVkRTrS2nFNrGI5tlRixGvV1l4n1uXZzEnE9FftCpNnSY+adZPtJ0xIrklwJSMN58KQgIQlIyAu7znWeiUm/quDI/vT8SQwf4jZ47qvpIUs3JBJ8BVn2UQQ7IHBH7+vLiRnOuyg+VCzoI/t0UlKUi5IAHu72MeOc2UflFJQhPVSBw/wCx9//EACwQAAECAwUIAwEBAQAAAAAAAAEAESExQSBRYXGBEDBQkaGxwfBA0eFgoPH/2gAIAQEAAT8h/wBWDPUrYM/5cjDAByU7iZsAIxR++/8ALMl8cFZRoe7CX8qS1iCTgFXKQXBLZKFYaKUQINf5R9tVAVXzKyplF83FpuxAOdcX8QRpiiTksIOFwoEY2O0EJpkByQWVhdd2bguWbwkWGyxUH+HedHlbk6b+iwUCcBCwK/Ir1CduDQiAFMEgY4RonxNjQVNM2S+4jUu+L+FNezoqoEMsEyQ9ptusHnFZeD0tEC2x1KSuErjcgtRRKvdX2oi+sCgFOBiMEckijvKSkjH9P4U5Jn5hBQa9sDa1qeiLaYnIUSUXE0Owz5bGeQ4qetiFoHP8yiG7hwQAEcEODsspaVOCxCFXAFwfwchh78RvnfFBn2wLJR5DbcpkXoZCaR3pAhfkQmUhyORCoiwMCokJCMjtBOsMa1CQ4IYhHRU53kmonQbj/BvnhzlAmTVu/Glh70yQOudhDhFYEJPnvEbHIdF3Jq6YDQ7Gow56hU2KMLxUI7jjAsaznXso4fpP8DRDQF5oEapziYlMddsaBYKdmTkEJwbulhnkRs5GWZ8FI4eyNyZ53YbGovURQq4JsjQoBzHZgTZ9AiEAgIcEIl49QqsiIvqCJ+74fwD2aywJIADlCa4uYsFY599eq42AmuUWqn4lJNn5GxugeVmEY+e5EwgEFwV6tABREmfFiFRDQXVBYtnOtOnqqc93HyImAw3lJEbcjk4lY3vOmyEvVPJO4lUk87V03CHPUR7mGJYhUY0F1QTc+3VCDL9Wa4NtgaFC9YgGIWRjwURARBHbfMJusRwbiFQ0g3ceRl86gQciwGJV1g53lZ0rOhBYxNkZvgUILbEIIxCcyrYEI4ER84pWAMN5TTxoAlgUy2llpy4ILEIRQ9/FV9ilVsfReg+nHR1bAxJwkk5JcnG3hLHz6ECQZiXOq1DKE+iaOWxHBxCCyYMNwKDFfz2OO9UEe2IuCSH2xCAxCj/6zogxMFNeO5PrZTdcbJTnTbGooWrkAAxKo1IrynazO9VOImPmQQ8gAaWm2Hcxsw/OVKAw4IYhEVIudJEhmPxHekCaX43ZgcTjQU5Do+4J1OLZXioROXeDjTou/GqKZrTtJkrpCQGUCYFDfuDMjshonIIIMRJDPnsBM3oZ6AUpjmahGDMhzuCSEIMBYjEKIw30CK5toGDkzbCE8ObqONNU/bJQQHGDVSw515qbWPY2eyeYeTcQD9A7GLouNCgVuQDAq6nhiKFHaZ8WIQ0URCgjyDd31syIykkQQa8YZx+mSgm3w5uptsYYvnJHTgCDuAVFIhii0pzOlscF34VQDPC0zLY7MHmxZ7QRCTMnM4uYI4k+GqhzSQVAAftuEzQaTQm0AgAkAMNNyy+POtjC2DHkjeAy8TkncDjCnPosFTskX3ibdYjKIlEJOZT/AIhB3QOxyi1XoATHdsS8uY/FiQBJMBNFoWBg+1NaayF6GszZbd52BAo2HmJbuQPeB3U0wIaqSUg04tgicq9jBPQG2TBNKY2mgQfWTQAAEgGG7F65wKzUDqblnIQPrMBxYpbAcnJH7IlhuCSrBIrqkD1gAGAttOe/oFLHrHeuZ0TgcEVgDkcRuBX7iweB2uy+7ga+KHFQGHIsMyhnx+7fE3bLJESDlPMtPEQ52hvlvFSJMURyWAnC6gLMSK4ENBgAwFwFuXaUo0cVqJpBC+r4JAIYhxcU6RV8fooR9Jeg9nMtr6u28VTbPyk6gfXyo3ESfCpsht5WQ+IYjYMwvpQXjBsZNfWYKHiZyoglWgGWCKbHYggGDCFsvrEEnALDuMBRPgO1D4wzHnJ0O0NsAXkndQBK8HiU7e8Bs7C3Cg3Do/G7IO1tMvjAVii1UyoltdI7kK8REImkaCYJsj7zbRTjMAIFYtjBInG0ZiMAHKoqJbKkgGloQmhoMBgMB8dvcOfEtrFJ8Kh3iLqhxCLlHBF4WSulfihl7wGwx6GQukOCTzI52Bl7BMmB6Pdwh8w1T2sEdjDaWX8jBcDdQhhsRiMRtrWW7J4fG2DK/BSx1wgU4HYFHaGDdUdnLZ4oMEMoIMdNhyoggkEEETCyHhXMIEbYINJY31gKlB1YAGA+S3Dv8thv6qbuHH5VlgAQgiRECE3YKy/aY6aiozCMzzQrp1GYFCxAMAKDaG0cBH0WNIzCdNtj+h8GPgzFkZwOhTY6VJg5G0xYsUC5gvCTuoAJXg8Mn8AQXlJGvcglidoyI5EYowKLgPggxAILgyNp+b9DfMIJTBAwG+MRzUk9chByUoG5JByN5E91gOSwHJGVyJYEhdNBNSCh82mzV02lQW8rMWHQ8eQrww2lvcbO4peRfWPxIQCCF3FDQ+ldkCdDw5Vu132oVj6fpE0h6F2C+tOhDX+ArCuQMVNN+pUaXIXiidpfsfR0eVRYbhDEyVH9BdUOFByWYkSCRyS5OJsOf5B/U+Dh+IDNadExI6kpyVKDHtRoF5QMLomRY9kJlAjXpNfTWjR51VeghUrkJ64O9EoD03onCmlxyKIkCCQQYETC5XJsLwELEPqLGFRypPCsO3nXZhB5BRo4InsqEZgUiWmI0KZDIEC8lHex4CEOZ/E7y6eAT5w7D7UZCokqRI4BosgsRyE9vF8Bo8jr4Ke1Of0V2OwsXcC1Iy+LzU9hhJ1kU4Qfl34rOw68CAv+HYFF5BzfsZc5LACkByIKTjUpb1i86kQHdAgZ66qsakLxwngMSvHYFETOcoJWNaCRK5L0EqZ0NiOTsrYO+HLNS+Er0fdhJwKjbNQJZym7s5ihsB9gvCTCgAleDwdzPe6mzi70NlyMLo372nMhc6H2d/gpcj+kDZnS36cGR7997TXTzSCGUqlEzLMiWvBMqXLXZ/UFpjswWInZjEKgmguCY4ISwT0vFVtMsadMbsHXacXhYgQjKKkRMjU1WpSfoFQLMAi6OYI2euqjOhLwwvhoFUPkEDMqgFbMkKhjyow5OHmp1Rin8FpXcthtfYdmvDY9A8EiVTYCpQtXrR5ok4/AAPAg6DmqTct14tlJlkKEoA0Tm9Obzshu20MsjPBOsWwb8sPcS1bRTTibgkiCAMQWIxFnzwwU4EAQjATRH6HkLUB4dH8cNhAHy3IyIBBYgzB3hq0gAHJT0AEzsqGvoGzIGEL4ppg4xLA8BwiOVdtptDJ+Q+EF7TOjLGmuRruQ7gNEyCZMZz8k1s4h2mrdyFLU0/pHgAxTAcnAIvZEsNwWqwiK6ooZrBAMB8k/uhBPhOic1dTehDs1QfYL2SM8xSqwG8kBPS/JXceeY7lmB52YsxzjGIU4QwugnwVwt1Q1OegPmxTkw5K4Dko7xq/bqi0w9Jpp84RJiiTkqreAuoFqozhw1IUNozZhlR8segfmzjPyrWYZ1hNBBsOHN7vs809n2/AQnaT4+WT9nRVeAZC6yDtyMBeUCk03xacPAG4GIwKxPpeUrT/DcxX5Z88vzFoMHD1b+Is9jzS0atiOWIVZwQ3BP5LwbkWqJjZCACq5xEBKJLVTUAX3aLGkGOx+Ti4CEE1iytOPiQ2PyKG05cBcz8pzDAMv9pgJAEETBpZAh/0/EqISyN6YUHY/dkcAxcoUHy3IHpRvT0dXOYonfYTtFhgpEaDTiYsBAH4oZAAXYnqmXhDp6oOVJ8R+dDTkbyLoo45DoKFFAYcVZFXJN5QFYDgA/wBH3//EAC4QAQACAAQFBAICAgMBAQAAAAEAESExUWEQIEFxgTBAUJGhsWDBcPCA4fHRkP/aAAgBAQABPxD5k9lXt79K/lLjwv2F8bl8L5r+Jv0Ll/H3Ll8Lly/TuXwv+I37S/8A8Tr/AOEOP+Iq/wAYY+6PnLg26G7+LhSLIyAxWKZDpeDLmdG/WXqKgfwi4FGeSURMv7Py4t+G8/FvE57zdAtlwoV+LJdRpK7qO48f1Yb/AIlXDAv8EYjrBwjv1cBM0e8tvM+g8cmSgCX+BnEh7dkaLP7u0HCDxLr9IhQAK0rBHYS57+sa9AhLqJkN6rFKNiITW4SfwE4s6XttHKKQq+q1o29hX3G/7lQm8/8AfoF9/wADYGPORXQ2Zcx/8He5bWjrX84NSVtH+BHElq/i6RPbb2ungRb/AK+0ZSYFVUXCYBUX+khxXh9jNclMxy6JtzWwyzPNS8p5YhLIpO2Q7zPrTuRC2irEUUkLdxPcSnVw0deBXB/gOX5SO4a66tcvgpgzu38kqnUH2cbN7psBvxLGtosel6O2C1Vi7TAgYf1ltI/dPXxCECAxEcRI9hYO9xQxxcxLGVzlPu7i/C4e1w5MOC/Y/uekWEj7r0jvtq0WIy50lP8AWyl0NhUt8TNcd1HjAzudSXzC7F5niCMKFmmOSzVlOi79jLClWykElrey5MoSDG8LblpMxvrIyRKSEE1+mcalWNFxw9xh8UuW/vyXXAt01YNI0/jPDjrA2oJ7ODxAgliUkwVn3eISh1mGEw/TdrpwqGp0563Onz9jLqO7U8IX1yOzK69etUycMwRDf3YV8Msn57whu44CA3VXpwnjkYtnkfoE00/Hm+AQLH7im2IN9yMdh6fZ4MxNJ2rMT+nWhgtggfJ4GUuSG5Uyjm5ZfkBHJGUuTENZvVj3ugREp9mYfB4e7Zjf+cUfkiAGauRFWKb9eRyRn+uhK7BH2CHECw52FTOEQ6hk+SdfD2xnDiTDTuil6XU69XxEMACJkjkwaqo2hB85BOkMHHD0aFfat3pllOkzvBd6dc389jy+IEImll3VLWLi6nb0EDkVChPwuXzo75XL9LyFmQtna4uNJITolyqT6ywhiqo6jEKS3uCBrLKqUWjjDb3sCUy1rKGmYLlCI9RgeV2/WanCT54gSYZjsk/phy18vhK62tOiRy4Qs1KITAr9s+VinFXemEoiO5/RAcufS9tDFR4OgslJHr/H2CKAliUkpYv5HLwy+ppdnCCCOTqFkwYfBRAQIETMTJggsAP9mMorV+7o4Axl/BPQcpFIIiJY6nNXDD5O4c0q3U1vVEZqxWBeWBvfF40FiK+zcotlmU8ifDfGplL8Thw8kk2ZiDHoPyMiVt93vWWLUfAdd7qnNBs7gUZyynRKSIimjQNJboAdxGPUiW/g4La8eznF+BuX6dy/VPYzujGSGe3XAJSpd/eS5aiFuFvuQt7BeVQK/pIVL5ca/wDv0mGCQEpODQIBIsrqOCQd3GrXHUpqEO51WyS4UXYvM8RKDwtnCrLAmtMxf7t2ILiReM29HWe5KgA+fMdznuXL+RIoMFkFqqr1XNXNjWn5JQOVUpVTf0XZchbe2OdSo9fL+x8GDiCCjMSAwyPTqeZjV+b4J14jbhomPPDUYqm7MSkl62T0kzhgvyRIIDhgH92DM535GwItw3aKzS2Ed4H0pDqceYK0pf3yiC0W45vdmIL/AFPoLKyj39OBMA6vQjBTWDJCpbRbo9XGDEyCdIGoNNuIZjHkgN5Gs1L4oMg7w4kf2+0Js+SOVi1/Zsxc6/5AvKw5V/tFqxPc9CQtuB6jH+Zw1x4FERpMmCUtP4zygSAbf4Y8imgo7ql0YEx5M8eu0fkDkx5Mfj0BVoDFjG109s3kxHyfzZsGmgnd6+TL5XAYhrCO/igh8fDrjB0oxaAo9EcRbvzWMRWDUERQ+xWuSuRYkV/6GPwt+xq5grXa0eqwI4Z3cc5now7+hgRJSt6pbFyW3KceUOg52FQjm0nU/sOU5Lg4xHTF3ycVfHnIdYBU9AgWW/bdSC8w1vsgMQY7HXzz5wMvWMR1aP6j07jIankDnYVN95nUCGuzpr0X42spXrUs0EmHqbsnPnAJuLd8PCM0FtMRQbaIB0DA9Meob2YQ7avopkfRK1/lqQdlF2QC2ISzZLTQv0DFQd+nIFHOtflOVATD/wBDt+rYcvuu/Io7VvDq9T0DdQ9FHxpUCV6wiRKIwtpgc6Wv5eDRAh1SiEiYQ9VivWfI8rzWqzGdEelC7S0VnVRdsjAWVyXw4p+s/Kn9cLoCIa3doWEAaJf7igVzhZAoOd+PuKZEupPW7uYqdxusDy1wo9GorMmYWMCR30vy1iD90/rMXq+Bp7mpxChGY58mzoOW0MoIqa9O/o/QpxKjtssLLlFp9CZ49KmBD7FX/QMXsW/uGzM+FrmA1fk/ojeKIgasZo6eBFJZ7MyAAABkBkc4qUm6BbHDbVGjgJjHPLw6Fe1y3nuONBwsxQ/dxAxHLkCx+SsdBj2TDWq1Od6hU63hwkaq1dvbC5925ECKt8KyfJLjHw4FnrAfH1Kcz3u9CISW7F5Hgi3zVuBlI8N73fuZVN+5hnS6/ccQsII9AxWMdcL6YcF+4hd0oLcE3QKD2zMjXPvnCVHWHbgmG2dnsPjwh+dHT8qzqRC2rRbffVAHXV5ouEfWdzgtIcVNoN5Y4wof6776zs31jPr2Ir8MyPM9hzwKjVv4b3Fm/dqMVFusuzEpOOSwuyBePF+KGDu5BwW4AhugS5UgEBHMSyXGC2iyKIaUNq1tgRtP3mOqHpolCxUhSOiMKgOasNmQkYmoVwBBJxMejjDa7sAUe5ejT8eCsVh20BrmB8UcVsVjfUfS1qUaiS44MDC/rnSTRhtpiTPvAd+TRjV47Yo6JDKOdQGRwqNUza+YN108GaWPR9+2c/YPEAp2pftMMe3ijSGzwUR9QZTy4kRQBXZ43WuXd9DhHrkCx+LCLcNPtgRS7ydUt4VwJPgGlWgNEmNACDYj1JUrkdOVsYphYmB0CvWzZcVCLs6fw8rI96YIvaOrfylX/wA0/wDNQQOZLP4YoYY/6xFF1sSLZLT14CIem+KIEJkdyj1zcxh8NiHv2rGVxxIC1wDqrLbisuY5Hs1jUbNfgYdDrjhtZRN86O/JTwZsqC56gD7kp+Lf1H4y3lZTaCfzBAr3X4GOjfN/1MWlOMcaPN3zc4HMo6Pz9EItku6rNWHCoqg4OjFDpgaf8ODxwqWNxNTKys3EV4EqJKlFSw6GqgfSbbXW3hZLlkv1L4iGHT8iKkFsWp1YhlsXw1jBK9UcFJIYdOfzHXS9E+6TrfuM9NO7wWf7hHDv8ykOHS/Ub6D2exti4V5nHfLBgXzKKQ6iRl0H+lCoNdwEYpwi4LuMp67m2Welh75ljadOnUcBlwZUdTV1ZEdjSjWuCrlb9+k/ETGn8ioGYPZGVoZjoyyWa+jZH4nrmP8A1F0nY6DptEqieHQ1WxEodmDuu/0TuSRSn7zm9/mWy5cWVMdYeLcmr8RtnaQHEKYrA/vOBb9exx6Di27V3xOKpjyia/Gn4UaswGWKqlVtXNXNYcSEzM8sAMo+kCMDgL7U30cTGnxHq/SgGRdip/oi2jKjxs/2llkSSM3i/wCWIYD8Pwxv0+lK4UNR/bKal1k4MrNCSgQtjuFg1HnZukzM3qLqTY7B/vgfRJGCDY05jqMW1wDHIwCWiIomTFmg21BV+SXfWi+XyEOFS6FyzviGwHXIFj8NdEe+b9zg644EWXuytl43vEtbs7Bi5fDxK5cZUqVLgtWW6sR1eNXDMLYshm9zFfWY50pTwr+2QclxjwVfuF8K+DQld+qXnwnCokVEvyDBiZ0PvYn5uSHcIPDHhUrjXJTMdIDpAdGVK9epUUNoQQcZfR6eDKShjdp4rEKDB6QpAGj4TwSK0EZ5UT2zebwHgcLKxH2Yrg1NVHRlJKM/sJ/7833YLPyHn+p+M6f7qQyuTsxh35CkjvwPA63VvtJ+q8vz+kmdzGvvQ9hZE8BjyGotD2AKgEWirdrpeDhhg+JHB8kuXxAKwtKKfBotW/XnCgONwhL+KJ+6S78qmLLGP2Ys/aZRkij+JVzCO1Em4n/oTuv3K0SjQ9JABSsxWmqECLt/Zs+sSvQ9Dj0Hsca1sZ3GoohZWYlJyUMq7QGrx598EBEAqegdYW1fXp1PPCuJGRt+Q0HluXL5L9PJlPpr4pxw1AzE9G+Lf6p5GgEMrNZgN5KADIKDikV6oPacsB5LaVvrZAUAL1Czg+/UKl71DNMMORIRqZft8W/Z3LlO2P8A5pOOHAOG7KHCucIrUoC17BELo6FwKLYivzrzY/P+3tSYUJy+TVfv4CH+yrIC1iOv4mXMa6FmnYwMfpiBR7io8LazyaMd0vL64vmmjvwaYorjSSxmJ3RAWqt7KDhx6f00rE0LyWu+izzVSx5V6GA3bFDyLKEDmQr7C+lnB92cGqrE2iHDHjYlVQFq+0XH0b1Mc4e4YDkewl6mV6bWCjrokbPIxa8Q0Jw+9Nq43QEzh+zWEDkqIVvB3L42BESxzIhdOEZ44o2ODa8Vj7THmIGTltDKEOJww1B2AZxVs8f7d34w4YwLXvmeVij2rpLAVB2oH3dgV27dIoat/U8CXwrg6kkeaYBAXRm807RfoV8MW1N2SFJMtbGt0+bO41Hp7uPg/SHUIcAl8r+9fkZ4m5uZb4eW4588uZiDBLRVDZn3IP5BXwXEHPh90HCuKg6A96Vfq37S+e/RtYEOwh01vxWXkcb4BKarbyZJy4+zD/tsKiSA52ZfGpWD2gnOFX16dfCHHJxr2XJVDCL0HycX3Fx2xo6Z1JW8dAUo6JK5DXN/dehfwB6BwDXFW69AdmW8v3NBswIcElRdSc/dMEPVpwHHxhZ0MiT+yAZHhgg1h79WApRTsalfEXznCpVFFXgkg79wPxDBMvsih+oU3ghmBZmcdfdzhVxk25/mBAdxuhMughC8HyqERMGb5+Bm0fBfxA92Q44fJWeg8x/lbD/EdcMPnqmHp38Jh62HxxxuW+pfC32l8t+nfp3Ll/8AKG/ncfl8P+Dp6B7U5j4H/9k=" alt="Alea Logo" className="w-full h-full object-contain" />
                </div>
                <svg
                  viewBox="0 0 108 40"
                  className="h-10 w-auto text-[#3E2723] dark:text-[#F4F1EA]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="6"
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                >
                  <polyline points="2,32 14,8 26,32" />
                  <polyline points="34,8 34,32 50,32" />
                  <polyline points="74,8 58,8 58,32 74,32" />
                  <line x1="58" y1="20" x2="70" y2="20" />
                  <polyline points="82,32 94,8 106,32" />
                </svg>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Piattaforma</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    isActive={activeView === item.title}
                    tooltip={item.title}
                    onClick={(e) => {
                      e.preventDefault();
                      if (onViewChange) onViewChange(item.title);
                    }}
                    asChild
                  >
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="mx-0" />
      </SidebarContent>

      <SidebarFooter className="p-2 space-y-2">
        <div className="rounded-lg border bg-sidebar-accent/50 p-1">
          <Calendar
            mode="single"
            selected={currentDateObj}
            onSelect={handleDateSelect}
            className="w-full flex justify-center p-2"
            modifiers={{
              missingOne: missingOneDates,
              missingBoth: missingBothDates
            }}
            modifiersClassNames={{
              missingOne: "after:content-['!'] after:absolute after:top-0.5 after:right-1 after:text-red-500 after:text-[11px] after:font-black",
              missingBoth: "after:content-['!!'] after:absolute after:top-0.5 after:right-0 after:text-red-500 after:text-[11px] after:font-black"
            }}
            classNames={{
              head_cell: "w-8 text-xs text-muted-foreground",
              cell: "h-8 w-8 text-center text-sm p-0 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
              day: "relative h-8 w-8 p-0 font-normal aria-selected:opacity-100 hover:bg-accent hover:text-accent-foreground rounded-md",
              day_today: "font-semibold",
            }}
          />
        </div>

        <SidebarSeparator className="mx-0" />

        <SidebarMenu>
          {/* BOTTONE TORNA ALLA SELEZIONE RUOLO */}
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" onClick={onLogout} className="hover:bg-amber-50 dark:hover:bg-amber-950/30 transition-colors cursor-pointer">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-[#967D62]/10 text-[#967D62]">
                <ArrowRightCircle className="size-5 rotate-180" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-bold text-sm">Cambia Modalità</span>
                <span className="truncate text-xs text-muted-foreground">Torna alla selezione</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* INFO UTENTE */}
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="cursor-default hover:bg-transparent">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-black/5 dark:bg-white/10 text-[#2C2A28] dark:text-[#F4F1EA]">
                <UserCircle className="size-5" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-bold text-sm">Account</span>
                <span className="truncate text-xs text-muted-foreground">{userEmail || '—'}</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
