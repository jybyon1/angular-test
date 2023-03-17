import { ChangeDetectorRef, Component, TemplateRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import base64Icon from '../../assets/json/base64.json';
import layerList from '../../app/data/layerData.json';

@Component({
  selector: 'app-layer',
  templateUrl: './layer.component.html',
  styleUrls: ['./layer.component.scss'],
})
export class LayerComponent {
  layerControl = new FormControl('all');
  layerTableName = new FormControl(
    '',
    Validators.compose([Validators.pattern(/^([a-z0-9_]){0,20}$/)])
  );

  modalRef: any;
  layerList: object[] = [];
  layerTypeList: object[] = [];
  backResult = false;
  page: number = 1;
  layerDefault: object[] = [];
  loading: boolean = true;
  layerData: object[] = [];
  totalCount: number = 0;
  nullImg = base64Icon.null_icon;
  pager: object = {};

  constructor(
    // 변경 감지 기능을 제공
    //private cdr: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {
    this.selectLayerList();
    this.getLayerList();
    this.route.paramMap.subscribe(() => {
      this.route.queryParamMap.subscribe((queryParams) => {
        if (queryParams.get('nextUrl')) {
          const paramArr = queryParams.get('nextUrl').split(',');
          for (let i = 0; i < paramArr.length; i++) {
            const value = paramArr[i].split(':');
            this.backResult = true;
            switch (i) {
              case 0:
                this.layerControl.setValue(value[1]);
                break;
              case 1:
                this.page = Number(value[1].substring(0, value[1].length - 1));
                break;
              default:
                break;
            }
          }

          setTimeout(() => {
            this.getLayerDefault(this.page);
          }, 100);
        } else {
          this.getLayerDefault(1);
        }
      });
    });
  }

  ngOnInit() {
    this.getLayerTypeList();
  }

  // ngAfterViewInit() {
  //   $('select').selectric();
  // }
  /**
   * @method ModalOpen
   * @description  모달 오픈
   * @param template
   * @return {undefined}
   */
  ModalOpen(template: TemplateRef<any>) {
    this.layerTableName.setValue('');
    // this.modalRef = this.modalService.show(template, {
    // 	class: 'modal-dialog-centered layer-list',
    // 	backdrop: 'static',
    // });
  }

  moveRegister() {
    // this.layerService.getTableCheck(`layer_${this.layerTableName.value}`).subscribe((result) => {
    // 	if (result.code === 200) {
    // 		if (result.response['table_exist']) {
    // 			this.layerTableName.setErrors({ overlap: true });
    // 		} else {
    // 			this.modalService.hide();
    // 			this.router.navigate(['/asset/layer-management/register'], {
    // 				queryParams: { tableName: this.layerTableName.value },
    // 			});
    // 		}
    // 	}
    // });
  }

  getLayerDefault(page) {
    const result = {
      code: 200,
      message: 'OK',
      responseTime: '2020-04-23 13:16:25',
      response: {
        count: 1,
        results: [
          {
            layer_id: 'layer_cctv',
            layer_name: 'CCTV',
            layer_type: 'POINT',
            layer_reg_date: '2020-03-16T01:35:42.546Z',
            sublayer_id: 'default',
            sublayer_name: 'default',
            sublayer_style: {},
            icon_id: '81362e0a-2cdd-47b2-b554-25cd151d5ab7',
            sub_reg_date: '2020-04-16T02:11:43.161Z',
            icon_img: 'data:image/svg+xml;base64,PD94',
            icon_img_type: 'image/svg+xml',
            icon_type: 'default',
            reg_date: '2020-04-16T02:11:43.161Z',
            upd_date: null,
          },
        ],
      },
    };
    if (result.code === 200) {
      this.layerDefault = result.response.results;
    }
  }

  selectLayerList() {
    console.log('layerData', this.layerData);
    const result = {
      code: 200,
      message: 'OK',
      responseTime: '2020-03-17 12:48:45',
      response: {
        count: 3,
        results: [
          {
            layer_id: 'layer_cctv',
            layer_name: 'CCTV',
            layer_type: 'POINT',
            legend_id: 'd7de97f6-8c60-40a1-8b34-d852da0dfedd',
            layer_order: 1,
            is_default_layer: true,
            reg_date: '2020-03-16T01:35:42.545Z',
            upd_date: null,
          },
          {
            layer_id: 'layer_hidy',
            layer_name: 'HIDY',
            layer_type: 'POINT',
            legend_id: null,
            layer_order: 1,
            is_default_layer: true,
            reg_date: '2020-03-16T10:54:26.298Z',
            upd_date: null,
          },
          {
            layer_id: 'layer_test',
            layer_name: 'TEST',
            layer_type: 'LINESTRING',
            legend_id: null,
            layer_order: 1,
            is_default_layer: true,
            reg_date: '2020-03-16T10:54:43.119Z',
            upd_date: null,
          },
        ],
      },
    };
    if (result.code === 200) {
      this.layerList = result.response.results;
      $('#layer')
        .selectric('refresh')
        .on('change', (e) => {
          this.layerControl.setValue(e.target.value);
        });

      // selectric 스크롤 오류 처리
      $('.selectric-scroll').on('mousewheel', (evt) => {
        evt.stopPropagation();
      });
    }
  }

  getLayerTypeList() {
    const result = {
      code: 200,
      message: 'OK',
      responseTime: '2022-04-28 08:31:40',
      response: {
        count: 1,
        results: [
          {
            uid: 'f93d29f3-7217-4bd6-a290-31341eae0626',
            user_account: '바로삭제1',
            user_name: '테스트유저',
            mobile_number: '01123051738',
            email: 'email@naver.com',
            birth_day: '920728',
            area: 'ASAN',
            department: '부서',
            position: '직급',
            office_phone_number: '025231124',
            account_state: 'APPROVAL',
            outer_account: true,
            outer_auth_info: {
              id: 'admin',
              url: 'http://www.naver.com',
            },
            group_code: '5b4eba46-5c00-4b2c-b75b-2b9beb19a092',
            reg_date: '2022-04-27T03:27:57.000Z',
            upd_date: '2022-04-27T03:27:57.000Z',
            is_temp_pwd: true,
            is_expire: false,
            pwd_update_date: '2022-04-27T03:27:57.000Z',
            confirm_id: 'user1',
            is_sms_agree: false,
            Group: {
              group_code: '5b4eba46-5c00-4b2c-b75b-2b9beb19a092',
              group_name: '천안_112요원',
              enabled: true,
              area: 'CHEONAN',
              reg_date: '2020-07-07T08:47:32.346Z',
              upd_date: '2021-08-19T00:50:54.000Z',
              group_type: 'general',
              event_auto_check: false,
              layer_auto_check: false,
            },
            Code: {
              code: 'APPROVAL',
              p_code: 'account_state',
              code_name: '승인',
              memo: {},
              is_used: true,
              reg_date: '2020-04-14T07:53:34.863Z',
              upd_date: '2021-08-04T06:22:36.000Z',
              is_modifiable: true,
            },
            File_Info: null,
          },
        ],
        total_count: {
          REQEUST: 1,
          REQUEST: 10,
          APPROVAL: 101,
          REJECT: 1,
          ALL: 113,
        },
      },
    };
    if (result.code === 200) {
      this.layerTypeList = result.response.results;
    }
  }

  getLayerList(page?: number) {
    if (page) {
      this.page = page;
    }

    const layerId =
      this.layerControl.value === 'all' ? '' : this.layerControl.value;
    const result = layerList;
    this.layerData = [];
    //this.totalCount = layerList.length;
    result['results'].forEach((item) => {
      this.layerDefault.forEach((layer) => {
        if (item['layer_id'] === layer['layer_id']) {
          if (
            item['layer_type'] === 'POINT' ||
            item['layer_type'] === 'MULTIPOINT'
          ) {
            item['layer_icon'] = {
              iconType: item['layer_type'],
              icon_img: layer['icon_img'] || this.nullImg,
            };
            item['subLayer_icon'] = {
              iconType: item['layer_type'],
              icon_img: item['icon_img'] || this.nullImg,
            };
          } else if (
            item['layer_type'] === 'LINESTRING' ||
            item['layer_type'] === 'POLYGON' ||
            item['layer_type'] === 'CIRCLE' ||
            item['layer_type'] === 'MULTIPOLYGON' ||
            item['layer_type'] === 'MULTILINESTRING'
          ) {
            item['layer_style'] = layer['sublayer_style'];
            item['layer_icon'] = {
              iconType: item['layer_type'],
              ...layer['sublayer_style'],
            };
            item['subLayer_icon'] = {
              iconType: item['layer_type'],
              ...item['sublayer_style'],
            };
          }
        }
      });
    });
    this.layerData = result['results'];
    this.setPage(this.page);
    this.loading = false;
  }

  /**
   * @method setPage
   * @description 페이징 처리
   * @param {number} page 페이지 번호
   * @return {undefined}
   */
  setPage(page: number) {
    if (page < 1 || page > this.pager['totalPages']) {
      return;
    }

    const total = Number(this.totalCount) === 0 ? 1 : this.totalCount;
    //this.pager = this.pageService.getPager(total, page, this.pageSize);
  }
}
