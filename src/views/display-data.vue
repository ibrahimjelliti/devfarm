<template>
  <div>
    <h2 class="content-block">Workstations</h2>
    <div class="content-block">
      <dx-data-grid
        id="gridContainer"
        class="dx-card wide-card"
        :remote-operations="false"
        :data-source="dataSourceConfig"
        :focused-row-index="0"
        :show-borders="false"
        :focused-row-enabled="true"
        :column-hiding-enabled="true"
      >
        <dx-scrolling mode="standard" />
        <dx-paging :page-size="10" />
        <dx-pager
          :show-page-size-selector="true"
          :allowed-page-sizes="pageSizes"
          :show-info="true"
        />
        <dx-sorting mode="multiple" />
        <dx-filter-row :visible="true" />
        <dx-load-panel :enabled="true" />
        <dx-grouping :contextMenuEnabled="false" />

        <dx-search-panel :visible="true" :width="350" placeholder="Search..." :highlightSearchText="true" />
        <dx-column data-field="Task_ID" :width="90" :hiding-priority="2" />

        <dx-column data-field="Task_Subject" caption="Subject" :width="190" :hiding-priority="8" />

        <dx-column data-field="Task_Status" caption="Status" :hiding-priority="6" :group-index="0" />

        <!-- <dx-column data-field="Task_Priority" caption="Priority" :hiding-priority="5">
          <dx-lookup display-expr="name" value-expr="value" :data-source="priorities" />
        </dx-column>-->

        <dx-column
          data-field="ResponsibleEmployee.Employee_Full_Name"
          caption="Assigned To"
          :allow-sorting="false"
          :hiding-priority="7"
        />

        <dx-column
          data-field="Task_Start_Date"
          caption="Start Date"
          data-type="date"
          :hiding-priority="3"
        />

        <dx-column
          data-field="Task_Due_Date"
          caption="Due Date"
          data-type="date"
          :hiding-priority="4"
        />

        <dx-column data-field="Task_Priority" caption="Priority" :hiding-priority="1" />

        <dx-column data-field="Task_Completion" caption="Completion" :hiding-priority="0" />
      </dx-data-grid>
    </div>
  </div>
</template>
<script>
import "devextreme/data/odata/store";
import DxDataGrid, {
  DxColumn,
  DxFilterRow,
  DxPager,
  DxPaging,
  DxScrolling,
  DxSorting,
  DxSearchPanel,
  DxLoadPanel,
  DxGrouping
} from "devextreme-vue/data-grid";

export default {
  data() {
    const priorities = [
      { name: "High", value: 4 },
      { name: "Urgent", value: 3 },
      { name: "Normal", value: 2 },
      { name: "Low", value: 1 }
    ];
    return {
      dataSource: priorities,
      pageSizes: [5, 10, 20]
    };
  },
  created() {
    this.dataSourceConfig = {
      store: {
        type: "odata",
        key: "Task_ID",
        url: "https://js.devexpress.com/Demos/DevAV/odata/Tasks"
      },
      expand: "ResponsibleEmployee",
      select: [
        "Task_ID",
        "Task_Subject",
        "Task_Start_Date",
        "Task_Due_Date",
        "Task_Status",
        "Task_Priority",
        "Task_Completion",
        "ResponsibleEmployee/Employee_Full_Name"
      ]
    };
  },
  components: {
    DxDataGrid,
    DxColumn,
    DxFilterRow,
    DxPager,
    DxPaging,
    DxScrolling,
    DxSorting,
    DxLoadPanel,
    DxSearchPanel,
    DxGrouping
  }
};
</script>
<style>
#gridContainer {
  height: 70vh;
}
</style>

